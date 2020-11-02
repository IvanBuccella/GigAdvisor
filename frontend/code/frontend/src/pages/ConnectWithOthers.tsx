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
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { chatbubbleEllipsesOutline } from "ionicons/icons";
import Loader from "../components/Loader";

const utilities = new Utils();

const ConnectWithOthers: React.FC = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

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

  function CategoriesOptions() {
    let ret = (
      <>
        <IonSelectOption value="">All Categories</IonSelectOption>
      </>
    );

    for (let i = 0; i < categories.length; i++) {
      ret = (
        <>
          {ret}
          <IonSelectOption value={categories[i]["slug"]}>
            {categories[i]["name"]}
          </IonSelectOption>
        </>
      );
    }
    return ret;
  }

  useEffect(() => {
    utilities.pageProtected("connect-with-others");

    utilities.postCall("categories", "").then((res) => {
      if (res.status) {
        setCategories(res.data);
      }

      let data = "";
      let tmp = utilities.getLastItem(window.location.pathname);
      if (window.location.pathname.split("/").length > 2 && tmp != "") {
        data = JSON.stringify({
          slug: "",
          category: tmp,
        });
        setCategory(tmp);
      }

      utilities.postCall("topics", data).then((res) => {
        if (res.status) {
          setTopics(res.data);
        }
        setShowLoader(false);
      });
    });
  }, []);

  return (
    <>
      <Loader showLoader={showLoader} />
      <IonSlide>
        <IonContent className="page-container connect-with-others">
          <h1 className="form-title mt1 mb1">Topics</h1>
          <IonRow>
            <IonCol
              sizeLg="2"
              sizeMd="6"
              sizeSm="6"
              sizeXs="12"
              className="text-left"
            >
              <IonSelect
                value={category}
                okText="Choose"
                cancelText="Dismiss"
                onIonChange={(e) => {
                  if (
                    utilities.getLastItem(window.location.pathname) !=
                    e.detail.value
                  ) {
                    setCategory(e.detail.value);
                    utilities.pageRedirect(
                      window.location.pathname.split("/")[1] +
                        "/" +
                        e.detail.value
                    );
                  }
                }}
                className="select-category pl0 pr0 pt0 pb0"
              >
                <CategoriesOptions />
              </IonSelect>
            </IonCol>
            <IonCol className="text-right">
              <IonButton
                onClick={() => utilities.pageRedirect("topic-create")}
                className="create-topic-button text-left"
              >
                Create Topic
              </IonButton>
            </IonCol>
          </IonRow>

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
