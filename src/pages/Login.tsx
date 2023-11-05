import {
  IonPage,
  IonContent,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonInput,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import "./Login.css";
import TitleBar from "../components/Auth/TitleBar";
import { eye, eyeOff } from "ionicons/icons";
import BtnGoogleSignin from "../components/Auth/BtnGoogleSignin";
import { useState } from "react";
import DontHaveAnAccount from "../components/Auth/DontHaveAnAccount";
import SignupModal from "../components/Auth/SignupModal";
import RememberMe from "../components/Auth/RememberMe";
import { useSignupModal } from "../hooks/auth/useSignupModal";
import { useLogin } from "../hooks/auth/useLogin";

export default function Login() {
  const hst = useIonRouter();

  const [showPass, setShowPass] = useState(true);
  const togglePass = () => {
    setShowPass((show) => !show);
  };

  const [rememberMe, setRememberMe] = useState(false);
  const toggleRememberMe = () => {
    setRememberMe((remember) => !remember);
  };

  const forgotMyPass = () => {
    hst.push("/forgotmypass");
  };

  // signup modal related functionalities
  const { page, modal, presentingElement, toggleShowSignup } = useSignupModal();

  // login related functionalities
  const { handleLogin, register, handleSubmit, getFieldState } = useLogin();

  return (
    <IonPage ref={page}>
      <IonContent fullscreen className="signinPage">
        <TitleBar />
        <IonGrid className="ion-padding">
          <IonRow>
            <IonText>
              <h1>Hi Klasmeyt!</h1>
            </IonText>
            <IonCol size="12">
              <IonInput
                className={"custom " + `${getFieldState("email").error?.message && "ion-invalid"}`}
                label="Email or username"
                labelPlacement="stacked"
                {...register("email", { required: true })}
                errorText="Invalid email or password"
              ></IonInput>
            </IonCol>
            <IonCol size="9">
              <IonInput
                className={"custom"  + `${getFieldState("password").error?.message && "ion-invalid"}`}
                label="Password"
                labelPlacement="stacked"
                type={showPass ? "password" : "text"}
                {...register("password", { required: true })}
                errorText="Invalid email or password"
              ></IonInput>
            </IonCol>
            <IonCol
              size="3"
              className="ion-justify-content-center ion-align-items-end"
            >
              <IonButton size="large" fill="clear" onClick={() => togglePass()}>
                <IonIcon src={showPass ? eye : eyeOff}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
          <RememberMe
            rememberMe={rememberMe}
            toggleRememberMe={toggleRememberMe}
            forgotMyPass={forgotMyPass}
          />
          <IonRow>
            <IonCol size="12">
              <IonButton expand="block" onClick={handleSubmit(handleLogin)}>
                Log In
              </IonButton>
            </IonCol>
            <IonCol size="12" className="ion-text-center">
              <IonText>or</IonText>
            </IonCol>
            <IonCol size="12">
              <BtnGoogleSignin />
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
