import { IonRow, IonCol, IonCheckbox, IonText } from "@ionic/react";
import "./RememberMe.css";
// TODO: Center and bold Forgot Password text

export default function RememberMe(props: {
  rememberMe: boolean;
  toggleRememberMe: () => void;
  forgotMyPass: () => void;
}) {
  return (
    <IonRow>
      <IonCol size="6" className="checkbox">
        <IonCheckbox
          labelPlacement="end"
          checked={props.rememberMe}
          onClick={props.toggleRememberMe}
        />
        <IonText className="rememberMe">Remember Me</IonText>
      </IonCol>
      <IonCol size="6" className="ion-text-start" onClick={props.forgotMyPass}>
        <IonText color="primary" className="forgotPassword">Forgot Password?</IonText>
      </IonCol>
    </IonRow>
  );
}