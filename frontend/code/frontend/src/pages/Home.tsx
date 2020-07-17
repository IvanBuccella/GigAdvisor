import React, { useState } from "react";
import { Utils } from "../core/Utils";
import Loader from "../components/Loader";
const utilities = new Utils();

const Home: React.FC = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [message, setMessage] = useState("");

  if (new Utils().isAuthenticatedUser()) {
    let data = JSON.stringify({
      token: new Utils().getUserToken(),
    });
    utilities.postCall("hello", data).then((res) => {
      if (res.status) {
        setShowLoader(false);
        setMessage(res.data.message);
      }
    });

    return (
      <div className="page-container">
        <Loader showLoader={showLoader} />
        <p>
          You're a logged in user. <br />
          {message}
        </p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Loader showLoader={showLoader} />
      <p>Standard home page. For not logged in users.</p>
    </div>
  );
};

export default Home;
