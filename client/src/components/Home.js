import axios from "axios";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

const Home = (props) => {
  const [collection, setCollection] = useState(null);

  const getPosts = async () => {
    const posts = await axios.get("/api/posts");

    setCollection(posts.data);
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {collection !== null ? (
        <div>
          <h1>News Feed</h1>
          {collection.map((post) => (
            <div key={post._id}>
              <PostItem post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div>loading..</div>
      )}
    </div>
  );
};

export default Home;
