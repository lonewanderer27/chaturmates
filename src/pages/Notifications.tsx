import {
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Notifications.css";
import { useState } from "react";
import { NOTIFICATION_CATEGORY } from "../enums/notifications";
import NotificationsCategory from "../components/Notifications/Category";
import All from "../components/Notifications/All";
import Archived from "../components/Notifications/Archived";
import Following from "../components/Notifications/Following";



function Notifications() {
  const [activeSegment, setActiveSegment] = useState(NOTIFICATION_CATEGORY.ALL);

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
      </IonContent>
    </IonPage>
  );
}

export default Notifications;
