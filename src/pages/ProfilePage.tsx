import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import "./Profile.css";
import { client } from "../client";
import { useCurrentStudent } from "../hooks/student/useSelfStudent";

function ProfilePage() {
  const handleLogout = () => {
    client.auth.signOut();
  };

  const { data, isLoading, error } = useCurrentStudent();
  console.log("data", data);
  console.log("isLoading", isLoading);
  console.log("error", error);

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
        <IonButton onClick={handleLogout} expand="block">
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default ProfilePage;
