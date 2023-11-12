import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonText, IonToolbar } from "@ionic/react";

export default function Group() {
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  )
}
