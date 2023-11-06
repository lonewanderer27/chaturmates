import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonModal,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { close, eye, eyeOff } from "ionicons/icons";
import { Ref, useState } from "react";
import "./SignupModal.css";
import BtnContinueWithGoogle from "./BtnContinueWithGoogle";
import AgreeToTerms from "./AgreeToTerms";
import useGoogle from "../../hooks/auth/useGoogle";
import useSignup from "../../hooks/auth/useSignup";

type IonModalProps = React.ComponentProps<typeof IonModal>;

export default function SignupModal(
  props: IonModalProps & {
    handleToggle: () => void;
    presentingElementRef: HTMLElement | undefined;
    modalRef: Ref<HTMLIonModalElement>;
  }
) {
  const [showPass, setShowPass] = useState(false);
  const togglePass = () => {
    setShowPass((show) => !show);
  };

  const [agree, setAgree] = useState(false);
  const toggleAgree = () => {
    setAgree((agree) => !agree);
  };

  const { handleGoogle, googleRes } = useGoogle();
  
  console.log(googleRes);

  return (
    <IonModal
      id="signupModal"
      presentingElement={props.presentingElementRef}
      ref={props.modalRef}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={props.handleToggle}>
              <IonIcon src={close}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Sign up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="signupPage ">
        <IonGrid className="ion-padding">
          <IonRow>
            <IonCol>
              <IonInput
                name="email"
                type="email"
                label="Your Email Address"
                labelPlacement="stacked"
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput label="Full Name" labelPlacement="stacked"></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonInput label="User Name" labelPlacement="stacked"></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="9">
              <IonInput
                label="Password"
                labelPlacement="stacked"
                type={showPass ? "password" : "text"}
              ></IonInput>
            </IonCol>
            <IonCol
              size="3"
              className="ion-justify-content-center ion-align-items-end"
            >
              <IonButton size="large" fill="clear" onClick={togglePass}>
                <IonIcon src={showPass ? eye : eyeOff}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="9">
              <IonInput
                label="Confirm password"
                labelPlacement="stacked"
                type={showPass ? "password" : "text"}
              ></IonInput>
            </IonCol>
            <IonCol
              size="3"
              className="ion-justify-content-center ion-align-items-end"
            >
              <IonButton size="large" fill="clear" onClick={togglePass}>
                <IonIcon src={showPass ? eye : eyeOff}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
          <AgreeToTerms agree={agree} toggleAgree={toggleAgree} />
          <IonRow>
            <IonCol size="12">
              <IonButton expand="block">Sign up</IonButton>
            </IonCol>
            <IonCol size="12" className="ion-text-center">
              <IonText>or</IonText>
            </IonCol>
            <IonCol size="12">
              <BtnContinueWithGoogle onClick={handleGoogle} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
}
