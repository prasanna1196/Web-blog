import React, { useContext, useEffect } from "react";
import Posts from "./Posts";
import AddPost from "./AddPost";
import AuthContext from "../../context/auth/authContext";

const Dashboard = (props) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push("/login");
    }
  }, []);

  return (
    <div>
      <div className="grid-2">
        <div>
          <AddPost />
        </div>
        <div>
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
