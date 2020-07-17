import React from "react";
import { IonLoading } from "@ionic/react";

const Loader: React.FC<{ showLoader: boolean }> = ({ showLoader }) => {
  return (
    <IonLoading
      cssClass="login-loader"
      isOpen={showLoader}
      message="Please Wait..."
      duration={0}
    />
  );
};

export default Loader;
