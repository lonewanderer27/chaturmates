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
  IonLabel,
  IonItem,
} from "@ionic/react";
import "./Login.css";
import TitleBar from "../components/TitleBar";
import { eye, eyeOff } from "ionicons/icons";
import BtnContinueWithGoogle from "../components/Auth/BtnContinueWithGoogle";
import { useState } from "react";
import DontHaveAnAccount from "../components/Auth/DontHaveAnAccount";
import SignupModal from "../components/Auth/SignupModal";
import RememberMe from "../components/Auth/RememberMe";
import { useSignupModal } from "../hooks/auth/useSignupModal";
import { useLogin } from "../hooks/auth/useLogin";
import InputGroup from "react-bootstrap/InputGroup";
import { Form, Button } from "react-bootstrap";

export default function Login() {
  const hst = useIonRouter();
  console.log("login page");

  const [showPass, setShowPass] = useState(true);
  const togglePass = () => {
    setShowPass((show) => !show);
  };

  const [rememberMe, setRememberMe] = useState(false);
  const toggleRememberMe = () => {
    setRememberMe((remember) => !remember);
  };

  const forgotMyPass = () => {
    hst.push("/forgotpass");
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
              <h1 className="text-3xl font-semibold font-poppins">Hi Klasmeyt!</h1>
            </IonText>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <BtnContinueWithGoogle />
            </IonCol>
            <IonCol size="12" className="ion-text-center">
              <IonText className="font-poppins font-bold">or</IonText>
            </IonCol>
            <IonCol size="12">
              <IonLabel className="my-2">
                <IonText className="font-poppins">Email or Username</IonText>
              </IonLabel>
              <IonInput
                className="custom my-1"
                {...register("email", { required: true })}
                errorText="Invalid email or password"
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonLabel className="my-1 px-2">
              <IonText className="font-poppins">Password</IonText>
            </IonLabel>
            <InputGroup className="px-1 customB">
              <Form.Control
                className="custom"
                type={showPass ? "password" : "text"}
                {...register("password", { required: true })}
                placeholder="Password"
                onClick={() => togglePass()}
              />
              <Button onClick={() => togglePass()}>
                <IonIcon src={showPass ? eye : eyeOff}></IonIcon>
              </Button>
            </InputGroup>
          </IonRow>
          <RememberMe
            rememberMe={rememberMe}
            toggleRememberMe={toggleRememberMe}
            forgotMyPass={forgotMyPass}
          />
          <IonRow>
            <IonCol size="12">
              <IonButton
                className="font-poppins font-bold"
                expand="block"
                onClick={() => handleSubmit(handleLogin)}
              >
                Log In
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
