import { IonRow, IonCol, IonText, IonToggle } from "@ionic/react";
import "./AgreeToTerms.css"
// TODO: Align toggle to the right

export default function AgreeToTerms(props: {
  agree: boolean;
  toggleAgree: () => void;
}) {
  return (
    <IonRow className="ion-align-items-center">
      <IonCol size="8">
        <IonText className="agreeToTerms">I agree with Terms &amp; Conditions</IonText>
      </IonCol>
      <IonCol size="4" className="ion-text-end">
        <IonToggle
          labelPlacement="end"
          checked={props.agree}
          onClick={props.toggleAgree}
        ></IonToggle>
      </IonCol>
    </IonRow>
  );
}
