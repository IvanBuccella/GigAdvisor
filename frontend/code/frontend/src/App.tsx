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

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Modules from "./pages/Modules";
import KnowYourRights from "./pages/KnowYourRights";
import About from "./pages/About";
import Team from "./pages/Team";
import Pubblications from "./pages/Pubblications";
import Platforms from "./pages/Platforms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Platform from "./pages/Platform";
import Review from "./pages/Review";
import Ratings from "./pages/Ratings";
import ConnectWithOthers from "./pages/ConnectWithOthers";

const App: React.FC = () => (
  <IonApp>
    <IonPage>
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
            <Route path="/modules" component={Modules} exact={true} />
            <Route path="/about" component={About} exact={true} />
            <Route path="/team" component={Team} exact={true} />
            <Route
              path="/pubblications"
              component={Pubblications}
              exact={true}
            />

            <Route
              path="/know-your-rights"
              component={KnowYourRights}
              exact={true}
            />
            <Route path="/platforms" component={Platforms} exact={true} />
            <Route
              path="/privacy-policy"
              component={PrivacyPolicy}
              exact={true}
            />
            <Route path="/platform" component={Platform} exact={false} />
            <Route path="/review" component={Review} exact={false} />
            <Route path="/ratings" component={Ratings} exact={true} />
            <Route
              path="/connect-with-others"
              component={ConnectWithOthers}
              exact={true}
            />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonContent>
      <Footer />
    </IonPage>
  </IonApp>
);

export default App;
