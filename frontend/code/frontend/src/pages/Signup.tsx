import React, { useState } from "react";
import {
  IonInput,
  IonItem,
  IonButton,
  IonToast,
  IonTitle,
  IonItemDivider,
  IonLabel,
} from "@ionic/react";
import { Utils } from "../core/Utils";
import Loader from "../components/Loader";
const utilities = new Utils();

const Signup: React.FC = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [signupOk, setSignupOk] = useState(false);

  const submit = () => {
    setShowLoader(true);
    if (password == confirmPassword && password.trim().length >= 8) {
      let data = JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
      });
      utilities.postCall("user-create", data).then((res) => {
        setShowLoader(false);
        if (res.status) {
          setSignupOk(true);
          setTimeout(function () {
            utilities.pageRedirect("login");
          }, 5000);
        } else {
          setSignupError(true);
        }
      });
    } else {
      setShowLoader(false);
      setPasswordError(true);
    }
  };

  return (
    <div className="page-container signup">
      <Loader showLoader={showLoader} />
      <IonToast
        isOpen={passwordError}
        message="Passwords don't match or don't respect 8 characters minimum."
        color="danger"
        duration={5000}
      />
      <IonToast
        isOpen={signupError}
        message="Signup Error"
        color="danger"
        duration={5000}
      />
      <IonToast
        isOpen={signupOk}
        message="User created succesfully"
        color="success"
        duration={5000}
      />

      <form
        className="signup-form"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <IonTitle size="large" className="form-title mt1 mb1">
          Sign Up for free
        </IonTitle>
        <IonItem lines="none" className="form-item mt1">
          <IonInput
            className="input-field"
            name="first_name"
            value={firstName}
            onIonChange={(e) => setFirstName(e.detail.value!)}
            type="text"
            placeholder="First Name"
            required
          ></IonInput>
        </IonItem>
        <IonItem lines="none" className="form-item mt1">
          <IonInput
            className="input-field"
            name="last_name"
            value={lastName}
            onIonChange={(e) => setLastName(e.detail.value!)}
            type="text"
            placeholder="Last Name"
            required
          ></IonInput>
        </IonItem>
        <IonItem lines="none" className="form-item mt1">
          <IonInput
            className="input-field"
            name="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            type="email"
            placeholder="Email"
            required
          ></IonInput>
        </IonItem>
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
          <IonInput
            className="input-field"
            name="confirm-password"
            value={confirmPassword}
            onIonChange={(e) => setConfirmPassword(e.detail.value!)}
            type="password"
            placeholder="Confirm Password"
            required
          ></IonInput>
        </IonItem>

        <IonItem lines="none" className="form-item mt1">
          <IonButton type="submit" className="signup-button">
            Sign Up
          </IonButton>
        </IonItem>
      </form>

      <IonItemDivider></IonItemDivider>
      <div className="login-section mt1">
        <IonLabel>Do you have an account yet?</IonLabel>
        <IonButton className="login-button mt1" expand="block" href="/login">
          Log In
        </IonButton>
      </div>
    </div>
  );
};

export default Signup;
