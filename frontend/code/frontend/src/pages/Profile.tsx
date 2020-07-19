import React, { useState, useEffect } from "react";
import { Utils } from "../core/Utils";
import Loader from "../components/Loader";
import {
  IonItem,
  IonInput,
  IonTitle,
  IonButton,
  IonCol,
  IonRow,
  IonGrid,
  IonRadioGroup,
  IonListHeader,
  IonLabel,
  IonRadio,
  IonToast,
  IonSlide,
  IonContent,
} from "@ionic/react";
import { Console } from "console";
const utilities = new Utils();

const Home: React.FC = () => {
  const [passwordError, setPasswordError] = useState(false);

  const [showLoader, setShowLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [position, setPosition] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [qualification, setQualification] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    utilities.pageProtected();

    let data = JSON.stringify({
      token: new Utils().getUserToken(),
    });
    utilities.postCall("user-profile", data).then((res) => {
      if (res.status) {
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setSex(res.data.sex);
        setPosition(res.data.position);
        setBirthDate(res.data.birth_date);
        setQualification(res.data.qualification);
        setShowLoader(false);
      } else {
        utilities.pageRedirect("login");
      }
    });
  }, []);

  const submit = () => {
    let data = JSON.stringify({
      token: new Utils().getUserToken(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      sex: sex,
      position: position,
      birthDate: birthDate,
      qualification: qualification,
      password: password,
    });

    if (password.length > 0 || confirmPassword.length > 0) {
      if (password != confirmPassword || password.length < 8) {
        setPasswordError(true);
        return;
      }
    }
    utilities.patchCall("user-profile-update", data).then((res) => {});

    console.log(data);
  };

  return (
    <>
      <Loader showLoader={showLoader} />
      <IonToast
        isOpen={passwordError}
        message="Passwords don't match or don't respect 8 characters minimum."
        color="danger"
        duration={5000}
      />
      <IonSlide>
        <IonContent className="page-container profile">
          <IonTitle size="large" className="form-title mt1 mb1">
            Profile
          </IonTitle>
          <IonGrid>
            <form
              className="profile-form"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <IonRow>
                <IonCol>
                  <IonItem
                    lines="none"
                    className="form-item form-item-image mt1"
                  >
                    <img alt="logo" src="/assets/logo.png" className="avatar" />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeXs="12" sizeSm="6" sizeMd="6" sizeLg="6" sizeXl="6">
                  <IonItem lines="none" className="form-item mt1">
                    <IonInput
                      className="input-field"
                      name="username"
                      value={username}
                      type="text"
                      placeholder="Username"
                      disabled
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
                    ></IonInput>
                  </IonItem>
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
                    <IonRadioGroup
                      value={sex}
                      onIonChange={(e) => setSex(e.detail.value)}
                      className="input-field sex"
                    >
                      <IonItem>
                        <IonLabel>Male</IonLabel>
                        <IonRadio slot="start" value="M" />
                      </IonItem>

                      <IonItem>
                        <IonLabel>Female</IonLabel>
                        <IonRadio slot="start" value="F" />
                      </IonItem>
                    </IonRadioGroup>
                  </IonItem>
                </IonCol>
                <IonCol sizeXs="12" sizeSm="6" sizeMd="6" sizeLg="6" sizeXl="6">
                  <IonItem lines="none" className="form-item mt1">
                    <IonInput
                      className="input-field"
                      name="position"
                      value={position}
                      onIonChange={(e) => setPosition(e.detail.value!)}
                      type="text"
                      placeholder="Position"
                      required
                    ></IonInput>
                  </IonItem>
                  <IonItem lines="none" className="form-item mt1">
                    <IonInput
                      className="input-field"
                      name="birth_date"
                      value={birthDate}
                      onIonChange={(e) => setBirthDate(e.detail.value!)}
                      type="date"
                      placeholder="Birth Date"
                      required
                    ></IonInput>
                  </IonItem>
                  <IonItem lines="none" className="form-item mt1">
                    <IonInput
                      className="input-field"
                      name="qualification"
                      value={qualification}
                      onIonChange={(e) => setQualification(e.detail.value!)}
                      type="text"
                      placeholder="Qualification"
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
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem lines="none" className="form-item mt1">
                    <IonButton type="submit" className="profile-button">
                      Update
                    </IonButton>
                  </IonItem>
                </IonCol>
              </IonRow>
            </form>
          </IonGrid>
        </IonContent>
      </IonSlide>
    </>
  );
};

export default Home;
