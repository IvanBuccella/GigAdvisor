import React, { useState, useEffect } from "react";
import { Utils } from "../core/Utils";
import Loader from "../components/Loader";
import {
  IonItem,
  IonInput,
  IonButton,
  IonCol,
  IonRow,
  IonGrid,
  IonRadioGroup,
  IonLabel,
  IonRadio,
  IonToast,
  IonSlide,
  IonContent,
  IonIcon,
} from "@ionic/react";
import { camera } from "ionicons/icons";

import { CameraResultType, CameraSource } from "@capacitor/core";
import { useCamera } from "@ionic/react-hooks/camera";

const utilities = new Utils();

const Home: React.FC = () => {
  const { getPhoto } = useCamera();

  const [userUpdateAlert, setUserUpdateAlert] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showLoader, setShowLoader] = useState(false);
  const [avatar, setAvatar] = useState("");
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

    utilities.postCall("user-profile", "").then((res) => {
      if (res.status) {
        setAvatar(res.data.avatar);
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

  const submitProfile = () => {
    let data = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      sex: sex,
      position: position,
      birthDate: birthDate,
      qualification: qualification,
    });

    utilities.patchCall("user-profile-update", data).then((res) => {
      if (res.status) {
        setUserUpdateSuccess(true);
      } else {
        setUserUpdateAlert(true);
      }
    });
  };

  const submitPassword = () => {
    let data = JSON.stringify({
      password: password,
    });

    if (password.length > 0 || confirmPassword.length > 0) {
      if (password != confirmPassword || password.length < 8) {
        setPasswordError(true);
        return;
      }
    }
    utilities.patchCall("user-password-update", data).then((res) => {
      if (res.status) {
        setUserUpdateSuccess(true);
        setPassword("");
        setConfirmPassword("");
      } else {
        setUserUpdateAlert(true);
      }
    });
  };

  const submitProfilePhoto = async () => {
    await getPhoto({
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 100,
    })
      .then((cameraPhoto) => {
        let data = JSON.stringify({
          avatar: cameraPhoto.base64String,
          format: cameraPhoto.format,
        });
        utilities.patchCall("user-avatar-update", data).then((res) => {
          if (res.status) {
            setUserUpdateSuccess(true);
            setAvatar(res.data.avatar);
          } else {
            setUserUpdateAlert(true);
          }
        });
      })
      .catch((error) => {});
  };

  return (
    <>
      <Loader showLoader={showLoader} />
      <IonToast
        isOpen={userUpdateAlert}
        onDidDismiss={() => setUserUpdateAlert(false)}
        message="Operation could not be done. Try again later"
        duration={5000}
        color="danger"
      />
      <IonToast
        isOpen={userUpdateSuccess}
        onDidDismiss={() => setUserUpdateSuccess(false)}
        message="Operation Completed Successfully."
        duration={5000}
        color="success"
      />
      <IonToast
        isOpen={passwordError}
        message="Passwords don't match or don't respect 8 characters minimum."
        color="danger"
        duration={5000}
      />
      <IonSlide>
        <IonContent className="page-container profile">
          <h1 className="form-title mt1 mb1">Profile</h1>
          <IonGrid>
            <form
              className="profile-form"
              onSubmit={(e) => {
                e.preventDefault();
                submitProfile();
              }}
            >
              <IonRow>
                <IonCol>
                  <IonItem
                    lines="none"
                    className="form-item form-item-image mt1"
                  >
                    <img
                      alt="logo"
                      src={new Utils().getApiEndpoint() + avatar}
                      className="avatar"
                      id="camera-photo"
                    />
                  </IonItem>

                  <IonButton onClick={() => submitProfilePhoto()}>
                    <IonIcon icon={camera}></IonIcon>
                  </IonButton>
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
                </IonCol>
                <IonCol sizeXs="12" sizeSm="6" sizeMd="6" sizeLg="6" sizeXl="6">
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
            <br />
            <h1 className="form-title mt1 mb1">Change your password</h1>
            <form
              className="profile-form"
              onSubmit={(e) => {
                e.preventDefault();
                submitPassword();
              }}
            >
              <IonRow>
                <IonCol>
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
                </IonCol>
                <IonCol>
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
                      Update Password
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
