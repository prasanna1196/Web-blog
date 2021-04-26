const mongoose = require("mongoose");
const Post = require("./Post");

const CommentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  body: {
    type: String,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
