import { IonRow, IonCol, IonText, IonToggle } from "@ionic/react";

// TODO: Align toggle to the right

export default function AgreeToTerms(props: {
  agree: boolean;
  toggleAgree: () => void;
}) {
  return (
    <IonRow className="ion-align-items-center">
      <IonCol size="8" className="ion-text-end ion-justify-content-start">
        <IonText>I agree with </IonText>
        <IonText>Terms & Conditions</IonText>
      </IonCol>
      <IonCol size="4" className="ion-justify-content-end">
        <IonToggle
          labelPlacement="end"
          checked={props.agree}
          onClick={props.toggleAgree}
        ></IonToggle>
      </IonCol>
    </IonRow>
  );
}
