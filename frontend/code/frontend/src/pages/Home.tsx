import React, { useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { Utils } from "../core/Utils";
import "./Home.css";

const Home: React.FC = () => {
  const [message, setMessage] = useState("");

  let auth: any;
  auth = localStorage.getItem("ga-auth");
  if (auth != undefined) {
    let token = JSON.parse(auth).token;
    if (token != undefined) {
      new Utils()
        .postCall(
          "http://localhost:8000/hello",
          JSON.stringify({ token: token }),
          "Token " + token
        )
        .then((data: { message: string }) => {
          setMessage(data.message);
        });

      return (
        <div className="container">
          <strong>
            <p>You're a logged in user. {message}</p>
          </strong>
        </div>
      );
    }
  }

  return <ExploreContainer />;
};

export default Home;
