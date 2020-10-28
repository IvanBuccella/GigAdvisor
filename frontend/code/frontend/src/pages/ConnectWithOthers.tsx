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
import Loader from "../components/Loader";

const utilities = new Utils();

const ConnectWithOthers: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
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
            <IonCol
              sizeLg="7"
              sizeMd="9"
              sizeSm="9"
              sizeXs="10"
              className="title"
            >
              <IonRouterLink href={"/topic/" + topic["slug"]}>
                <h3 className="title blue text-left">{topic["title"]}</h3>
              </IonRouterLink>
            </IonCol>
            <IonCol className="category">
              <p>{topic["category"]["name"]}</p>
            </IonCol>
            <IonCol className="count">
              <p>
                <IonIcon icon={chatbubbleEllipsesOutline} /> {topic["count"]}
              </p>
            </IonCol>
            <IonCol className="date">
              <p>{topic["date"]}</p>
            </IonCol>
          </IonRow>
        </>
      );
    }
    return ret;
  }

  useEffect(() => {
    utilities.pageProtected("connect-with-others");
    utilities.postCall("topics", "").then((res) => {
      if (res.status) {
        setTopics(res.data);
      }
      setShowLoader(false);
    });
  }, []);

  return (
    <>
      <Loader showLoader={showLoader} />
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
    </>
  );
};

export default ConnectWithOthers;
