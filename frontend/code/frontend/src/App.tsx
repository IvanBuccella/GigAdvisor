import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./scss/main.scss";
import { IonContent, IonPage } from "@ionic/react";

import { Menus } from "./components/Header/Menus";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const App: React.FC = () => (
  <IonApp>
    <IonPage>
      <Menus />
      <Header />
      <IonContent>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" component={Home} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/logout" component={Logout} exact={true} />
            <Route path="/signup" component={Signup} exact={true} />
            <Route path="/profile" component={Profile} exact={true} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonContent>
      <Footer />
    </IonPage>
  </IonApp>
);

export default App;
