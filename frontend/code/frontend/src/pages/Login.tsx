import React, { useState } from "react";
import {
  IonInput,
  IonItemDivider,
  IonItem,
  IonButton,
  IonLoading,
  IonToast,
  IonTitle,
  IonLabel,
} from "@ionic/react";
import Loader from "../components/Loader";
import { Utils } from "../core/Utils";
const utilities = new Utils();

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginAlert, setLoginAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const submit = () => {
    setShowLoading(true);
    let data = JSON.stringify({
      username: username,
      password: password,
    });
    utilities.postCall("user-auth", data).then((res) => {
      if (res.status) {
        setShowLoading(false);
        if (res.data.token != undefined) {
          utilities.setUserToken(res.data.token);
          window.location.href = "/home";
        } else {
          setLoginAlert(true);
        }
      } else {
        setShowLoading(false);
        setLoginAlert(true);
      }
    });
  };

  return (
    <div className="page-container login">
      <Loader showLoader={showLoading} />
      <IonToast
        isOpen={loginAlert}
        onDidDismiss={() => setLoginAlert(false)}
        message="Cannot Log in. Check inserted data."
        duration={5000}
        color="danger"
      />
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <IonTitle size="large" className="form-title mt1 mb1">
          Log in
        </IonTitle>
        <IonItem lines="none" className="form-item mt1">
          <IonInput
            className="input-field"
            name="username"
            value={username}
            onIonChange={(e) => setUsername(e.detail.value!)}
            type="text"
            placeholder="Username"
            required
          ></IonInput>
        </IonItem>
        <IonItem lines="none" className="form-item mt1">
          <IonInput
            className="input-field"
            name="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            type="password"
            placeholder="Password"
            required
          ></IonInput>
        </IonItem>

        <IonItem lines="none" className="form-item mt1">
          <IonButton type="submit" className="login-button">
            Log In
          </IonButton>
        </IonItem>
      </form>
      <IonItemDivider></IonItemDivider>
      <div className="signup-section mt1">
        <IonLabel>Don’t have an account yet?</IonLabel>
        <IonButton className="signup-button mt1" expand="block" href="/signup">
          Sign Up
        </IonButton>
      </div>
    </div>
  );
};

export default Login;
