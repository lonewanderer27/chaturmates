import { IonContent, IonPage, useIonRouter } from "@ionic/react"
import TitleBar from "../TitleBar";
import useSession from "../../hooks/auth/useSession";

export default function VerificationWrapper() {
  

  return (
    <IonPage>
      <IonContent fullscreen className="verifyPage">
        <TitleBar/>
      </IonContent>
    </IonPage>
  )
}
