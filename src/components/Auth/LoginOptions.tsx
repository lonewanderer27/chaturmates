import "./LoginOptions.css";

import {IonCol, IonRow, IonText} from "@ionic/react";

export default function LoginOptions(props: {
  rememberMe: boolean;
  toggleRememberMe: () => void;
  forgotMyPass: () => void;
}) {
  return (
    <IonRow className="pt-2">
      <IonCol size="6" className="checkbox">
      </IonCol>
      <IonCol size="6" className="ion-text-end" onClick={props.forgotMyPass}>
        <IonText color="primary" className="forgotPassword font-poppins font-bold cursor-pointer">Forgot Password?</IonText>
      </IonCol>
    </IonRow>
  );
}