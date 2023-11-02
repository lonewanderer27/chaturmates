import { IonRow, IonCol, IonCheckbox, IonText } from "@ionic/react";

// TODO: Center and bold Forgot Password text

export default function RememberMe(props: {
  rememberMe: boolean;
  toggleRememberMe: () => void;
  forgotMyPass: () => void;
}) {
  return (
    <IonRow>
      <IonCol size="6">
        <IonCheckbox
          labelPlacement="end"
          checked={props.rememberMe}
          onClick={props.toggleRememberMe}
        >
          <IonText>Remember Me</IonText>
        </IonCheckbox>
      </IonCol>
      <IonCol size="6" className="ion-text-end" onClick={props.forgotMyPass}>
        <IonText color="primary">Forgot my Password</IonText>
      </IonCol>
    </IonRow>
  );
}
