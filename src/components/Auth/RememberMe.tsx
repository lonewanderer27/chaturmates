import { IonRow, IonCol, IonCheckbox, IonText } from "@ionic/react";
import "./RememberMe.css";

export default function RememberMe(props: {
  rememberMe: boolean;
  toggleRememberMe: () => void;
  forgotMyPass: () => void;
}) {
  return (
    <IonRow className="pt-2">
      <IonCol size="6" className="checkbox">
        <IonCheckbox
          labelPlacement="end"
          checked={props.rememberMe}
          onClick={props.toggleRememberMe}
        />
        <IonText className="rememberMe font-poppins">Remember Me</IonText>
      </IonCol>
      <IonCol size="6" className="ion-text-end" onClick={props.forgotMyPass}>
        <IonText color="primary" className="forgotPassword font-poppins font-bold cursor-pointer">Forgot Password?</IonText>
      </IonCol>
    </IonRow>
  );
}