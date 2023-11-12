import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Profile.css";
import { client } from "../client";

function Profile() {

  const handleLogout = () => {
    client.auth.signOut();
  }

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonText slot="start" className="pageTitle">
              Profile
            </IonText>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Profile page" /> */}
        <IonButton onClick={handleLogout} expand="block">
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Profile;
