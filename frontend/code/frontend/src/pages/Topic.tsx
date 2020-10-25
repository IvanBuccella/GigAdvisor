import React, { useState, useEffect } from "react";
import { Utils } from "../core/Utils";
import {
  IonSlide,
  IonContent,
  IonCol,
  IonRow,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonButton,
  IonItem,
  IonTextarea,
  IonToast,
} from "@ionic/react";
import { timeOutline } from "ionicons/icons";
import Loader from "../components/Loader";

const utilities = new Utils();

const Topic: React.FC = () => {
  const [commentCreateInsertAlert, setCommentCreateInsertAlert] = useState(
    false
  );
  const [commentCreateInsertSuccess, setCommentCreateInsertSuccess] = useState(
    false
  );

  const [showLoader, setShowLoader] = useState(false);
  const [topic, setTopic] = useState({
    id: 0,
    title: "",
    slug: "",
    category: "",
    date: "",
  });
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  function CommentsCards() {
    let ret = <></>;
    let comment = null;
    for (let i = 0; i < comments.length; i++) {
      comment = comments[i];
      ret = (
        <>
          {ret}
          <IonRow className="comment">
            <IonCol sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="12" sizeXl="12">
              <IonCard className="card">
                <IonCardHeader className="pt0 pb0">
                  <IonCardSubtitle className="subtitle text-left">
                    <IonCol className="image">
                      <img
                        alt="logo"
                        src={
                          new Utils().getApiEndpoint() +
                          comment["user"]["avatar"]
                        }
                        className="avatar"
                      />
                    </IonCol>
                    <IonCol className="text">
                      <div className="date">
                        <IonIcon icon={timeOutline} className="icon" />
                        {comment["date"]}
                      </div>
                      <div>{comment["user"]["username"]}</div>
                    </IonCol>
                  </IonCardSubtitle>
                  <IonCardTitle>
                    <p className="text-left mt0 mb0">{comment["text"]}</p>
                  </IonCardTitle>
                </IonCardHeader>
              </IonCard>
            </IonCol>
          </IonRow>
        </>
      );
    }

    return ret;
  }

  useEffect(() => {
    let data = {
      slug: utilities.getLastItem(window.location.pathname),
      id: 0,
    };
    utilities.postCall("topics", JSON.stringify(data)).then((res) => {
      if (res.status) {
        let elem = res.data;

        setTopic({
          id: elem.id,
          title: elem.title,
          slug: elem.slug,
          category: elem.category.name,
          date: elem.date,
        });

        data = {
          slug: "",
          id: elem.id,
        };
        utilities.postCall("comments", JSON.stringify(data)).then((res) => {
          if (res.status) {
            setComments(res.data);
          }
        });
      }
    });
  }, []);

  const submitComment = () => {
    let data = {
      topic: topic["id"],
      text: text,
    };
    setShowLoader(true);
    utilities.patchCall("comment-create", JSON.stringify(data)).then((res) => {
      if (res.status) {
        setCommentCreateInsertSuccess(true);

        setTimeout(function () {
          window.location.reload();
        }, 2000);
      } else {
        setCommentCreateInsertAlert(true);
      }
      setShowLoader(false);
    });
  };

  return (
    <>
      <Loader showLoader={showLoader} />
      <IonToast
        isOpen={commentCreateInsertAlert}
        onDidDismiss={() => setCommentCreateInsertAlert(false)}
        message="Operation could not be done. Try again later"
        duration={5000}
        color="danger"
      />
      <IonToast
        isOpen={commentCreateInsertSuccess}
        onDidDismiss={() => setCommentCreateInsertSuccess(false)}
        message="Operation Completed Successfully."
        duration={5000}
        color="success"
      />
      <IonSlide>
        <IonContent className="page-container topic">
          <h1 className="mt1 mb1">{topic.title}</h1>
          <p className="mt0 mb1">Category: {topic.category}</p>
          <CommentsCards />

          <form
            className="profile-form"
            onSubmit={(e) => {
              e.preventDefault();
              submitComment();
            }}
          >
            <IonRow>
              <IonCol size="10" className="column">
                <IonItem lines="none" className="form-item mt1">
                  <IonTextarea
                    className="input-field textarea ml0"
                    name="description"
                    value={text}
                    onIonChange={(e) => setText(e.detail.value!)}
                    placeholder="Description"
                    required
                  />
                </IonItem>
              </IonCol>
              <IonCol className="column">
                <IonItem lines="none" className="form-item mt1">
                  <IonButton type="submit" className="comment-button">
                    Publish
                  </IonButton>
                </IonItem>
              </IonCol>
            </IonRow>
          </form>
        </IonContent>
      </IonSlide>
    </>
  );
};

export default Topic;
