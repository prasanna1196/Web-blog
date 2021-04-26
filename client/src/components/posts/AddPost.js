import React, { useContext, useState } from "react";
import PostContext from "../../context/post/postContext";
import AlertContext from "../../context/alert/alertContext";

const AddPost = () => {
  const postContext = useContext(PostContext);
  const alertContext = useContext(AlertContext);

  const { addPost } = postContext;
  const { setAlert } = alertContext;

  const [post, setPost] = useState({
    title: null,
    body: null,
  });

  const { title, body } = post;

  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (title.length < 6 || body.length < 6) {
      setAlert("Title and content should be atleast");
    } else {
      setPost({ title: "", body: "" });
      addPost(post);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2 className="text-primary">Create New Post</h2>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={onChange}
        />
        <textarea
          type="text"
          rows="8"
          placeholder="Post Content. . ."
          name="body"
          value={body}
          onChange={onChange}
        ></textarea>
        <div>
          <input
            type="submit"
            value="Submit"
            className="btn btn-primary btn-block"
          />
        </div>
      </form>
    </div>
  );
};

export default AddPost;
