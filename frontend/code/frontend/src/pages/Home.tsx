import React, { useState } from "react";
import { Utils } from "../core/Utils";
import { IonContent } from "@ionic/react";

const Home: React.FC = () => {
  const [message, setMessage] = useState("");

  let auth: any;
  auth = localStorage.getItem("ga-auth");
  if (auth != undefined) {
    let token = JSON.parse(auth).token;
    if (token != undefined) {
      new Utils()
        .postCall(
          new Utils().getApiEndpoint() + "hello",
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

  return <IonContent>Standard home page. For not logged in users.</IonContent>;
};

export default Home;
