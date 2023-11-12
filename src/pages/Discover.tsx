import {
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import "./Discover.css";
import BtnSearch from "../components/Discover/BtnSearch";
import useSession from "../hooks/auth/useSession";
import GroupsGrid from "../components/Discover/GroupsGrid";
import StudentsGrid from "../components/Discover/StudentsGrid";

function Discover() {
  const { session, nickname } = useSession();

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonText slot="start" className="pageTitle">
              Welcome, {nickname}
            </IonText>
            <IonButtons slot="end">
              <BtnSearch />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <StudentsGrid />
        <GroupsGrid />
      </IonContent>
    </IonPage>
  );
}

export default Discover;
