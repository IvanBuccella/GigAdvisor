import React from "react";
import { Utils } from "../core/Utils";
import { IonSlide, IonContent } from "@ionic/react";
const utilities = new Utils();

const Logout: React.FC = () => {
  if (utilities.getUserToken() != null) {
    localStorage.removeItem("ga-auth");
  }
  utilities.pageRedirect("home");

  return (
    <IonSlide>
      <IonContent className="container logout">
        <strong>
          <p>Logging out</p>
        </strong>
      </IonContent>
    </IonSlide>
  );
};

export default Logout;
