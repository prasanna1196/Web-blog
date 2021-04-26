const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Post = require("../models/Post");
const Comment = require("../models/Comment");

// Get the list of all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get posts of a user
router.get("/myPosts", auth, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create post
router.post("/", auth, async (req, res) => {
  const { title, body } = req.body;

  try {
    const newPost = new Post({
      author: req.user,
      title,
      body,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete Post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({ _id: req.params.id });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Comment on a post
router.post("/comment", auth, async (req, res) => {
  const { postId, comment } = req.body;

  try {
    const newComment = new Comment({
      user: req.user,
      body: comment,
    });

    const postComment = await Post.findById(postId);
    postComment.comments.push(newComment);
    await postComment.save();

    res.json(newComment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get comments of a post
router.get("/comments/:id", async (req, res) => {
  try {
    const comments = await Post.find({ _id: req.params.id }, { comments: 1 });
    res.json(comments);
    // console.log("comments", comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Like a post
router.get("/like/:id", auth, async (req, res) => {
  console.log(typeof req.params.id);

  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.indexOf(req.user) == -1) {
      post.likes.push(req.user);
    } else {
      post.likes.splice(post.dislikes.indexOf(req.user), 1);
    }
    if (post.dislikes.indexOf(req.user) !== -1) {
      post.dislikes.splice(post.dislikes.indexOf(req.user), 1);
    }
    await post.save();
    res.json(post.likes.length);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Disike a post
router.get("/dislike/:id", auth, async (req, res) => {
  console.log(typeof req.params.id);

  try {
    const post = await Post.findById(req.params.id);
    if (post.dislikes.indexOf(req.user) == -1) {
      post.dislikes.push(req.user);
    } else {
      post.dislikes.splice(post.likes.indexOf(req.user), 1);
    }
    if (post.likes.indexOf(req.user) !== -1) {
      post.likes.splice(post.likes.indexOf(req.user), 1);
    }
    await post.save();
    res.json(post.dislikes.length);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
