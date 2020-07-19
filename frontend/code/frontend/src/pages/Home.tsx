import React, { useState } from "react";
import { Utils } from "../core/Utils";
import { IonSlide, IonContent } from "@ionic/react";
const utilities = new Utils();

const Home: React.FC = () => {
  return (
    <IonSlide>
      <IonContent className="page-container home">
        <p>This is the home page</p>
      </IonContent>
    </IonSlide>
  );
};

export default Home;
