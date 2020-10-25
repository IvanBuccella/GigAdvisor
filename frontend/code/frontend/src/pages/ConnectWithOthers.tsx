import React, { useState, useEffect } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonCol,
  IonRow,
  IonGrid,
  IonRouterLink,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { chatbubbleEllipsesOutline } from "ionicons/icons";

const utilities = new Utils();

const ConnectWithOthers: React.FC = () => {
  const [topics, setTopics] = useState([]);

  function TopicRows() {
    let ret = <></>;
    let topic = null;

    for (let i = 0; i < topics.length; i++) {
      topic = topics[i];
      ret = (
        <>
          {ret}
          <IonRow className="topic">
            <IonCol size="7">
              <IonRouterLink href={"/topic/" + topic["slug"]}>
                <h3 className="title blue text-left">{topic["title"]}</h3>
              </IonRouterLink>
            </IonCol>
            <IonCol size="2">
              <p>{topic["category"]["name"]}</p>
            </IonCol>
            <IonCol size="1">
              <p>
                <IonIcon icon={chatbubbleEllipsesOutline} /> {topic["count"]}
              </p>
            </IonCol>
            <IonCol size="2">
              <p>{topic["date"]}</p>
            </IonCol>
          </IonRow>
        </>
      );
    }
    return ret;
  }

  useEffect(() => {
    utilities.pageProtected();
    utilities.postCall("topics", "").then((res) => {
      if (res.status) {
        setTopics(res.data);
      }
    });
  }, []);

  return (
    <IonSlide>
      <IonContent className="page-container connect-with-others">
        <h1 className="form-title mt1 mb1">Topics</h1>
        <IonButton
          onClick={() => utilities.pageRedirect("topic-create")}
          className="create-topic-button text-left"
        >
          Create Topic
        </IonButton>
        <IonRow className="topics-list">
          <IonGrid>
            <TopicRows />
          </IonGrid>
        </IonRow>
      </IonContent>
    </IonSlide>
  );
};

export default ConnectWithOthers;
