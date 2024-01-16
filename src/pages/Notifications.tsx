import "./Notifications.css";

import {IonContent, IonHeader, IonPage, IonText, IonToolbar, useIonViewWillEnter,} from "@ionic/react";

import All from "../components/Notifications/All";
import Archived from "../components/Notifications/Archived";
import Following from "../components/Notifications/Following";
import {NOTIFICATION_CATEGORY} from "../enums/notifications";
import NotificationsCategory from "../components/Notifications/Category";
import Pinned from "../components/Notifications/Pinned";
import {useState} from "react";

function Notifications() {
  const [activeSegment, setActiveSegment] = useState(NOTIFICATION_CATEGORY.ALL);

  useIonViewWillEnter(() => {
    document.title = "Notifications | Klasmeyt";
  }, []);

  return (
      <IonPage>
        <IonContent fullscreen className="ion-padding">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonText slot="start" className="pageTitle">
                Notifications
              </IonText>
              <IonText slot="end" color="primary">
                Mark all as read
              </IonText>
            </IonToolbar>
          </IonHeader>
          <NotificationsCategory
              value={activeSegment}
              setActiveSegment={setActiveSegment}
          />
          {activeSegment == NOTIFICATION_CATEGORY.ALL && (
              <All/>
          )}
          {activeSegment == NOTIFICATION_CATEGORY.ARCHIVE && (
              <Archived/>
          )}
          {activeSegment == NOTIFICATION_CATEGORY.FOLLOWING && (
              <Following/>
          )}
          {activeSegment == NOTIFICATION_CATEGORY.PINNED && (
              <Pinned/>
          )}
        </IonContent>
      </IonPage>
  );
}

export default Notifications;
