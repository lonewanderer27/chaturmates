import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import TitleBar from "../../components/TitleBar";
import DontHaveAnAccount from "../../components/Auth/DontHaveAnAccount";
import { useHistory } from "react-router";
import { close } from "ionicons/icons";
import SignupModal from "../../components/Auth/SignupModal";
import { useSignupModal } from "../../hooks/auth/useSignupModal";

export default function ForgotMyPassConfirm() {
  const hst = useHistory();

  // signup modal related functionalities
  const { page, modal, presentingElement, toggleShowSignup } = useSignupModal();

  const handleReturnToLogin = () => {
    hst.push("/login", {
      direction: "back",
    })
  };

  return (
    <IonPage ref={page}>
      <IonContent fullscreen>
        <TitleBar />
        <IonGrid className="ion-padding">
          <IonRow>
            <IonButton
              className="ml-[-20px]"
              fill="clear"
              onClick={handleReturnToLogin}
            >
              <IonIcon src={close} />
            </IonButton>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                <h1 className="text-2xl font-semibold">Check your email!</h1>
              </IonText>
              <IonText>Follow the instructions on your email.</IonText>
            </IonCol>
          </IonRow>
          <IonRow className="my-5">
            <IonCol>
              <IonButton expand="block" onClick={handleReturnToLogin}>
                <IonText>Return to Log in</IonText>
              </IonButton>
            </IonCol>
          </IonRow>
          <DontHaveAnAccount handleClick={toggleShowSignup} />
        </IonGrid>
        <SignupModal
          handleToggle={toggleShowSignup}
          presentingElementRef={presentingElement}
          modalRef={modal}
        />
      </IonContent>
    </IonPage>
  );
}
