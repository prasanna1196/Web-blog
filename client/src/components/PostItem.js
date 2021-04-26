import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import AlertContext from "../context/alert/alertContext";
import PostContext from "../context/post/postContext";

const PostItem = (post) => {
  const history = useHistory();
  const {
    post: { _id, author, title, body, likes, dislikes },
  } = post;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext;

  const postContext = useContext(PostContext);
  const { addComment } = postContext;

  // Mark as liked or disliked
  const [likeStatus, setLikeStatus] = useState({
    liked: false,
    disliked: false,
    likeCount: likes.length,
    dislikeCount: dislikes.length,
  });

  const { liked, disliked, likeCount, dislikeCount } = likeStatus;

  // Update like count
  const handleLike = async () => {
    if (!isAuthenticated) {
      return history.push("/login");
    }

    axios.get(`/api/posts/like/${_id}`);

    if (!liked && !disliked) {
      setLikeStatus({ ...likeStatus, liked: true, likeCount: likeCount + 1 });
    }
    if (liked & !disliked) {
      setLikeStatus({ ...likeStatus, liked: false, likeCount: likeCount - 1 });
    }
    if (!liked && disliked) {
      setLikeStatus({
        ...likeStatus,
        liked: true,
        disliked: false,
        likeCount: likeCount + 1,
        dislikeCount: dislikeCount - 1,
      });
    }
  };

  // Update dislike count
  const handleDislike = async () => {
    if (!isAuthenticated) {
      return history.push("/login");
    }
    await axios.get(`/api/posts/dislike/${_id}`);

    if (!liked && !disliked) {
      setLikeStatus({
        ...likeStatus,
        disliked: true,
        dislikeCount: dislikeCount + 1,
      });
    }
    if (!liked & disliked) {
      setLikeStatus({
        ...likeStatus,
        disliked: false,
        dislikeCount: dislikeCount - 1,
      });
    }
    if (liked && !disliked) {
      console.log("here");
      setLikeStatus({
        ...likeStatus,
        liked: false,
        disliked: true,
        likeCount: likeCount - 1,
        dislikeCount: dislikeCount + 1,
      });
    }
  };

  const [authorName, setAuthorName] = useState(null);

  const [comments, setComments] = useState({
    commentlist: null,
  });

  let commentors = [];

  // Find authors name using _id
  const getauthorsName = async () => {
    const name = await axios.get(`/api/users/${author}`);
    setAuthorName(name.data);
  };

  // Find commentors name using _id
  const commentorsName = async () => {
    const res = await axios.get(`/api/posts/comments/${_id}`);
    // console.log(res.data);
    if (res.data) {
      for (let comment of res.data[0].comments) {
        const name = await axios.get(`/api/users/${comment.user}`);
        // console.log(name.data);
        commentors.push({ person: name.data, commentBody: comment.body });
      }
      setComments({ ...comments, commentlist: commentors });
    }
  };

  const [newComment, setNewComment] = useState({ postId: _id, comment: "" });
  const { comment } = newComment;

  const onChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  // Add comment on a post
  const onSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      history.push("/login");
    } else {
      if (comment.length < 1) {
        return setAlert("Comment cannot be empty", "danger");
      }
      addComment(newComment);
      setNewComment({ ...newComment, comment: "" });
      setComments({
        ...comments,
        commentlist: [
          ...comments.commentlist,
          { person: user.name, commentBody: comment },
        ],
      });
    }
  };

  // Check if user has liked or disliked the post
  useEffect(() => {
    if (isAuthenticated) {
      setLikeStatus({
        ...likeStatus,
        liked: likes.indexOf(authContext.user._id) !== -1,
        disliked: dislikes.indexOf(authContext.user._id) !== -1,
      });
    }
  }, [isAuthenticated]);

  // Get Commentors name using their _id
  useEffect(() => {
    commentorsName();
    getauthorsName();
  }, []);

  return (
    <div>
      {authorName !== null ? (
        <div>
          <div className="blog-card">
            <div className="post-content">
              <h2>{title}</h2>
              <h4>{`Author: ${authorName}`}</h4>
              <p style={{ marginBottom: "10px" }}>{body}</p>
              <div className="likes">
                <h4 style={{ marginRight: "30px" }} onClick={handleLike}>
                  <Link to="#">
                    <i className="fas fa-thumbs-up" /> {likeCount}
                  </Link>
                </h4>
                <h4 onClick={handleDislike}>
                  <Link to="#">
                    <i className="fas fa-thumbs-down" /> {dislikeCount}
                  </Link>
                </h4>
              </div>
            </div>
            <div className="comment-content">
              <h3>Comments</h3>
              {comments.commentlist !== null &&
                comments.commentlist.length !== 0 &&
                comments.commentlist.map((comment, index) => (
                  <div>
                    <h4>{comment.person}</h4>
                    <p>{comment.commentBody}</p>
                  </div>
                ))}
            </div>
          </div>
          <div>
            <h3>Add Comment</h3>
            <form onSubmit={onSubmit}>
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <div style={{ width: "70%" }}>
                  <textarea
                    type="text"
                    rows="3"
                    placeholder="Comment text. ."
                    name="comment"
                    value={comment}
                    onChange={onChange}
                  ></textarea>
                </div>
                <input
                  name="Submit"
                  type="submit"
                  style={{
                    marginTop: "20px",
                    marginLeft: "20px",
                    padding: "0 10px",
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default PostItem;
