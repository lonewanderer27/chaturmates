import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import "./Klasmeyts.css";
import StudentsResults from "../../components/Discover/KlasmeytsResults";
import { useHistory } from "react-router";

export default function Klasmeyts() {
  const rt = useHistory();
  function handleViewMore() {
    rt.push("/");
  }

  return (
    <IonPage>
      <IonContent fullscreen className="groupPage">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton routerLink="/discover">
                <IonButton>Back</IonButton>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        {/* TODO: Fix back button above this card */}
        <IonCard className="groupPageCard ion-padding">
          <IonGrid>
            <StudentsResults />
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
