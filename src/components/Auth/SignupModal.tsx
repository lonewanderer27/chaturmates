import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
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
  const [showPass, setShowPass] = useState(true);
  const togglePass = () => {
    setShowPass((show) => !show);
  };

  const [agree, setAgree] = useState(false);
  const toggleAgree = () => {
    setAgree((agree) => !agree);
  };

  const { handleGoogle, googleRes } = useGoogle();
  const { handleSignUp, signupRes, register, handleSubmit } = useSignup();

  console.info("google response:", googleRes);
  console.info("signup response:", signupRes);

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
              <IonLabel>
                <IonText>Your Email Address</IonText>
              </IonLabel>
              <IonInput
                className="custom"
                type="email"
                {...register("email", { required: true })}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText>Full Name</IonText>
              </IonLabel>
              <IonInput
                className="custom"
                {...register("fullName", { required: true })}
              ></IonInput>
            </IonCol>
          </IonRow>
          {/* <IonRow>
            <IonCol>
              <IonLabel>User Name</IonLabel>
              <IonInput className="custom"></IonInput>
            </IonCol>
          </IonRow> */}
          <IonRow>
            <IonCol>
              <IonLabel>Password</IonLabel>
              <IonInput
                className="custom"
                type={showPass ? "password" : "text"}
                {...register("password", { required: true })}
              ></IonInput>
            </IonCol>
            <IonButton size="large" fill="clear" onClick={togglePass}>
              <IonIcon src={showPass ? eye : eyeOff}></IonIcon>
            </IonButton>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>Confirm Password</IonLabel>
              <IonInput
                className="custom"
                type={showPass ? "password" : "text"}
                {...register("passwordConfirmation", { required: true })}
              ></IonInput>
            </IonCol>
            <IonButton size="large" fill="clear" onClick={togglePass}>
              <IonIcon src={showPass ? eye : eyeOff}></IonIcon>
            </IonButton>
          </IonRow>
          <AgreeToTerms agree={agree} toggleAgree={toggleAgree} />
          <IonRow>
            <IonCol size="12">
              <IonButton expand="block" onClick={handleSubmit(handleSignUp)}>
                Sign up
              </IonButton>
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
