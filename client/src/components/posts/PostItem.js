import React, { useContext } from "react";
import PostContext from "../../context/post/postContext";

const PostItem = (post) => {
  const postContext = useContext(PostContext);
  console.log(post);

  const { deletePost } = postContext;

  const {
    post: { _id, title, body, user },
  } = post;

  const onDelete = () => {
    deletePost(_id);
  };

  return (
    <div className="card bg-light">
      <ul className="list">
        <li>
          <h4>{title}</h4>
        </li>
        <li>{body}</li>
      </ul>
      <p>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

export default PostItem;
