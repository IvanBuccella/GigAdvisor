import React, { useState } from "react";
import { Utils } from "../core/Utils";

const Home: React.FC = () => {
  const [message, setMessage] = useState("");

  if (new Utils().isAuthenticatedUser()) {
    let url = new Utils().getApiEndpoint() + "hello";
    let data = JSON.stringify({
      token: new Utils().getUserToken(),
    });

    new Utils().postCall(url, data).then((data: { message: string }) => {
      setMessage(data.message);
    });

    return (
      <div className="page-container">
        <p>
          You're a logged in user. <br />
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <p>Standard home page. For not logged in users.</p>
    </div>
  );
};

export default Home;
