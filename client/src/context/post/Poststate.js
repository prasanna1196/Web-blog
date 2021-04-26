import React, { useReducer, useState } from "react";
import axios from "axios";
import PostContext from "./postContext";
import postReducer from "./postReducer";
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  GET_COMMENTS,
  ADD_COMMENT,
  POST_ERROR,
} from "../types";

const PostState = (props) => {
  const initialState = {
    posts: null,
    comments: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(postReducer, initialState);

  //Get Posts
  const getPosts = async () => {
    try {
      const res = await axios.get("/api/posts/myPosts");

      dispatch({
        type: GET_POSTS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add post
  const addPost = async (post) => {
    const config = {
      headers: {
        // We're not sending token here since it is set globally (Check utils)
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/posts", post, config);

      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Delete post
  const deletePost = async (id) => {
    try {
      await axios.delete(`/api/posts/${id}`);

      dispatch({
        type: DELETE_POST,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Get comments for a post
  const getComments = async (id) => {
    try {
      let res = await axios.get(`/api/posts/comments/${id}`);
      console.log(res.data[0].comments);
      dispatch({
        type: GET_COMMENTS,
        payload: res.data[0].comments,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
    }
  };

  // Add comment
  const addComment = async (comment) => {
    const config = {
      headers: {
        // We're not sending token here since it is set globally (Check utils)
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(`/api/posts/comment`, comment, config);

      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: err.response.msg,
      });
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        comments: state.comments,
        filtered: state.filtered,
        error: state.error,
        getPosts,
        addPost,
        deletePost,
        getComments,
        addComment,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
