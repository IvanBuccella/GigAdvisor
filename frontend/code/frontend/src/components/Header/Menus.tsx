import React from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonRouterOutlet,
} from "@ionic/react";

export const Menus: React.FC = () => (
  <>
    <IonMenu
      side="start"
      menuId="header-menu"
      contentId="header-menu"
      className="header-menu"
    >
      <IonHeader>
        <IonToolbar color="dark" className="toolbar">
          <img alt="logo" src="/assets/logo.png" className="logo" />
        </IonToolbar>
      </IonHeader>
      <IonContent className="header-menu-content">
        <IonList className="header-menu-list">
          <IonItem className="header-menu-item">
            <a href="/">Home</a>
          </IonItem>
          <IonItem className="header-menu-item">
            <a href="/reviews">Reviews</a>
          </IonItem>
          <IonItem className="header-menu-item">
            <a href="/ratings">Ratings</a>
          </IonItem>
          <IonItem className="header-menu-item">
            <a href="/community">Community</a>
          </IonItem>
          <IonItem className="header-menu-item">
            <a href="/contact">Contact Us</a>
          </IonItem>
          <IonItem className="header-menu-item">
            <a href="/login">Login</a>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
    <IonRouterOutlet id="header-menu"></IonRouterOutlet>
  </>
);
