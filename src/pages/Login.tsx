import {Button, Form} from "react-bootstrap";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import React, {useState} from "react";
import {eye, eyeOff} from "ionicons/icons";

import BtnContinueWithGoogle from "../components/Auth/BtnContinueWithGoogle";
import DontHaveAnAccount from "../components/Auth/DontHaveAnAccount";
import InputGroup from "react-bootstrap/InputGroup";
import SignupModal from "../components/Auth/SignupModal";
import TitleBar from "../components/TitleBar";
import {useLogin} from "../hooks/auth/useLogin";
import {useSignupModal} from "../hooks/auth/useSignupModal";

export default function Login() {
  const hst = useIonRouter();
  console.log("login page");

  const [showPass, setShowPass] = useState(true);
  const togglePass = () => {
    setShowPass((show) => !show);
  };

  const forgotMyPass = () => {
    hst.push("/forgotpass");
  };

  // signup modal related functionalities
  const { page, modal, presentingElement, toggleShowSignup } = useSignupModal();

  // login related functionalities
  const { handleLogin, register, handleSubmit, trigger, handleError, setValue, formState, loggingIn, getFieldState, getValues } = useLogin();

  useIonViewWillEnter(() => {
    document.title = "Login | Klasmeyt";
  }, []);

  return (
    <IonPage ref={page}>
      <IonContent fullscreen className="signinPage">
        <TitleBar />
        <IonGrid className="ion-padding">
          <form onSubmit={handleSubmit(handleLogin, handleError)}>
            <IonRow>
              <IonText>
                <h1 className="text-3xl font-semibold font-poppins ml-1">Hi Klasmeyt!</h1>
              </IonText>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <BtnContinueWithGoogle disabled={loggingIn} />
              </IonCol>
              <IonCol size="12" className="ion-text-center">
                <IonText className="font-poppins font-bold">or</IonText>
              </IonCol>
              <IonCol size="12" className="px-2">
                <IonLabel className="my-2">
                  <IonText className="font-poppins">Email</IonText>
                </IonLabel>
                <InputGroup data-bs-theme="dark">
                  <Form.Control
                    className="font-poppins customB"
                    isInvalid={getFieldState("email").invalid}
                    placeholder="Enter Email"
                    {...register("email", { required: true })}
                    disabled={loggingIn}
                  />
                  {getFieldState("email").invalid && (
                    <Form.Control.Feedback type="invalid">
                      {getFieldState("email")?.error?.message}
                    </Form.Control.Feedback>
                  )}
                </InputGroup>
              </IonCol>
            </IonRow>
            <IonRow className="mb-4">
              <IonItem className="w-100">
                <IonLabel slot="start" className="ml-[-8px]">
                  <IonText className="font-poppins">Password</IonText>
                </IonLabel>
                <IonLabel slot="end" className="mr-[-8px]" onClick={forgotMyPass}>
                  <IonText className="underline font-poppins font-bold cursor-pointer">Forgot Password?</IonText>
                </IonLabel>
              </IonItem>
              <InputGroup className="px-2" data-bs-theme="dark">
                <Form.Control
                  className="font-poppins"
                  type={showPass ? "password" : "text"}
                  {...register("password", { required: true })}
                  placeholder="Enter Password"
                  onChange={(e) => setValue("password", e.target.value)}
                  disabled={loggingIn}
                  isInvalid={!!formState.errors.password}
                />
                <Button variant="outline-dark" onClick={() => togglePass()}>
                  <IonIcon src={showPass ? eye : eyeOff}></IonIcon>
                </Button>
                <Form.Control.Feedback type={"invalid"} className={"pe-4"}>
                  {formState.errors.password?.message}
                </Form.Control.Feedback>
              </InputGroup>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonButton
                  className="font-poppins font-bold"
                  expand="block"
                  type={"submit"}
                  disabled={loggingIn}
                >
                  {loggingIn && <IonSpinner name="lines-small" className="mr-2" />}
                  Log In
                </IonButton>
              </IonCol>
            </IonRow>
            <DontHaveAnAccount handleClick={toggleShowSignup} />
          </form>
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
