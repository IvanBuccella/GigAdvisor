import React, { useState } from "react";
import {
  IonInput,
  IonList,
  IonItem,
  IonButton,
  IonLoading,
  IonToast,
} from "@ionic/react";

import { Utils } from "../core/Utils";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAlert, setLoginAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const submit = () => {
    //setShowLoading(true);
    new Utils()
      .postCall(
        new Utils().getApiEndpoint() + "auth-user",
        JSON.stringify({
          username: email,
          password: password,
        }),
        ""
      )
      .then((data: { token: string | any[] | undefined } | undefined) => {
        setShowLoading(false);
        if (
          data != undefined &&
          data.token != undefined &&
          data.token.length > 0
        ) {
          const token = JSON.stringify({ token: data.token });
          localStorage.setItem("ga-auth", token);
          window.location.href = "/home";
        } else {
          setLoginAlert(true);
        }
      });
  };

  return (
    <IonList>
      <IonItem>
        <IonInput
          value={email}
          onIonChange={(e) => setEmail(e.detail.value!)}
          type="email"
          placeholder="Email"
          required
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonInput
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
          type="password"
          placeholder="Password"
          required
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonButton expand="full" type="submit" onClick={(e) => submit()}>
          Login
        </IonButton>
      </IonItem>
      <IonLoading
        cssClass="login-loader"
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={"Please wait..."}
        duration={0}
      />
      <IonToast
        isOpen={loginAlert}
        onDidDismiss={() => setLoginAlert(false)}
        message="Impossibile accedere. Verificare le credenziali immesse."
        duration={5000}
        color="danger"
      />
    </IonList>
  );
};

export default Login;
