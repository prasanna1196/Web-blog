const mongoose = require("mongoose");
const Comment = require("./Comment");

const CommentSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  body: {
    type: String,
  },
});

const PostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  likes: [
    {
      type: String,
    },
  ],
  dislikes: [
    {
      type: String,
    },
  ],
  comments: [CommentSchema],
});

module.exports = mongoose.model("Post", PostSchema);
