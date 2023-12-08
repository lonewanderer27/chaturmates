import { IonRow, IonCol, IonText, IonToggle } from "@ionic/react";
import "./AgreeToTerms.css"

type IonToggleProps = React.ComponentProps<typeof IonToggle>;

export default function AgreeToTerms(props: IonToggleProps & {
  agree: boolean;
  toggleAgree: () => void;
}) {
  return (
    <IonRow className="ion-align-items-center">
      <IonCol size="8">
        <IonText className="agreeToTerms  font-poppins">I agree with Terms &amp; Conditions</IonText>
      </IonCol>
      <IonCol size="4" className="ion-text-end">
        <IonToggle
          {...props}
          labelPlacement="end"
          checked={props.agree}
          onClick={props.toggleAgree}
        ></IonToggle>
      </IonCol>
    </IonRow>
  );
}
