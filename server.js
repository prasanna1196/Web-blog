const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json({ extended: false }));

// Connect to DB
mongoose
  .connect(
    "mongodb+srv://prasanna96:blogtest123@blog.a6gp6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/posts", require("./routes/posts"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
