import React from "react";
import {
  IonFooter,
  IonToolbar,
  IonGrid,
  IonRow,
  IonIcon,
  IonButtons,
  IonRouterLink,
} from "@ionic/react";
import {
  homeOutline,
  walletOutline,
  peopleOutline,
  newspaperOutline,
} from "ionicons/icons";

const Footer: React.FC = () => {
  const isActiveMenuItem = (pageName: string) => {
    let pageSlug = window.location.pathname.split("/")[1];

    if (pageName == "modules") {
      let modulesPages = [
        "modules",
        "platforms",
        "platform",
        "review",
        "ratings",
        "connect-with-others",
        "topic",
        "topic-create",
        "platforms-map",
        "platform-map",
        "api-endpoints",
      ];

      if (modulesPages.includes(pageSlug)) {
        return "blue";
      }
    } else if (pageName == "home") {
      let homePages = [
        "",
        "home",
        "login",
        "logout",
        "know-your-rights",
        "about",
        "signup",
        "privacy-policy",
        "profile",
      ];
      if (homePages.includes(pageSlug)) {
        return "blue";
      }
    } else if (pageName == "team" && pageSlug == "team") {
      return "blue";
    } else if (pageName == "pubblications" && pageSlug == "pubblications") {
      return "blue";
    }

    return "";
  };

  return (
    <IonFooter className="footer">
      <IonToolbar className="footer-toolbar">
        <IonGrid className="footer-container">
          <IonRow className="footer-row">
            <IonToolbar className="footer-menu-container">
              <IonButtons slot="secondary" className="footer-buttons">
                <IonRouterLink href="/" className="footer-button">
                  <IonIcon
                    icon={homeOutline}
                    className={"" + isActiveMenuItem("home")}
                  />
                  <span className={"" + isActiveMenuItem("home")}>Home</span>
                </IonRouterLink>

                <IonRouterLink href="/modules" className="footer-button">
                  <IonIcon
                    icon={walletOutline}
                    className={"" + isActiveMenuItem("modules")}
                  />
                  <span className={"" + isActiveMenuItem("modules")}>
                    Modules
                  </span>
                </IonRouterLink>
                <IonRouterLink href="/team" className="footer-button">
                  <IonIcon
                    icon={peopleOutline}
                    className={"" + isActiveMenuItem("team")}
                  />
                  <span className={"" + isActiveMenuItem("team")}>Team</span>
                </IonRouterLink>
                <IonRouterLink href="/pubblications" className="footer-button">
                  <IonIcon
                    icon={newspaperOutline}
                    className={"" + isActiveMenuItem("pubblications")}
                  />
                  <span className={"" + isActiveMenuItem("pubblications")}>
                    Pubblications
                  </span>
                </IonRouterLink>
              </IonButtons>
            </IonToolbar>
          </IonRow>
        </IonGrid>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
