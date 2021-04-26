import React, { Fragment, useContext, useEffect } from "react";
import PostContext from "../../context/post/postContext";
import PostItem from "./PostItem";

const Posts = () => {
  const postContext = useContext(PostContext);

  const { posts, getPosts, loading } = postContext;

  useEffect(() => {
    getPosts();
    //eslint-disable-next-line
  }, []);

  if (!loading && posts !== null && posts.length === 0) {
    return <h4>Please add a Post</h4>;
  }

  return (
    <Fragment>
      {posts !== null && !loading ? (
        posts.map((post) => <PostItem key={post._id} post={post} />)
      ) : (
        <div>loading..</div>
      )}
    </Fragment>
  );
};

export default Posts;
