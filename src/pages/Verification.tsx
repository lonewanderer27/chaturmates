import {
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import TitleBar from "../components/TitleBar";
import useVerify from "../hooks/verification/useVerify";

export default function Verification() {
  const { register } = useVerify();

  return (
    <IonPage>
      <IonContent fullscreen className="verifyPage">
        <TitleBar />
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol size="12">
              <IonLabel>
                <IonText>Your Adamson Mail</IonText>
              </IonLabel>
              <IonInput
                className="custom"
                {...register("email", { required: true })}
                errorText="Invalid email or password"
              ></IonInput>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
