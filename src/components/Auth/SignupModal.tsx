import "./SignupModal.css";
import "./AgreeToTerms.css";

import { Button, Form, InputGroup } from "react-bootstrap";
import {
  CheckboxChangeEventDetail,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonModal,
  IonProgressBar,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import React, { Ref, useRef, useState } from "react";
import { close, eye, eyeOff } from "ionicons/icons";

import BtnContinueWithGoogle from "./BtnContinueWithGoogle";
import { Controller } from "react-hook-form";
import VerificationModal from "../Verification/VerificationModal";
import useGoogle from "../../hooks/auth/useGoogle";
import useSignup from "../../hooks/auth/useSignup";

type IonModalProps = React.ComponentProps<typeof IonModal>;

// TODO: Convert this to swipeable modal (Android version)

export default function SignupModal(
  props: IonModalProps & {
    handleToggle: () => void;
    presentingElementRef: HTMLElement | undefined;
    modalRef: Ref<HTMLIonModalElement>;
  }
) {
  const otpModal = useRef<HTMLIonModalElement>(null);
  const dismissOtpModal = () => {
    otpModal.current?.dismiss();

    console.log("otpModal dismissed");
  }

  const [showPass, setShowPass] = useState(true);
  const togglePass = () => {
    setShowPass((show) => !show);
  };

  const { handleGoogle, googleRes } = useGoogle();
  const {
    handleSignUp,
    signupRes,
    register,
    handleSubmit,
    getValues,
    setValue,
    control,
    getFieldState,
    handleError,
    trigger,
    registering
  } = useSignup();

  console.info("google response:", googleRes);
  console.info("signup response:", signupRes);

  return (
    <IonModal
      id="signupModal"
      // presentingElement={props.presentingElementRef}
      breakpoints={[0, 0.90, 1]}
      initialBreakpoint={0.90}
      ref={props.modalRef}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={props.handleToggle}>
              <IonIcon src={close}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle className="font-poppins">Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="signupPage ">
        <form onSubmit={handleSubmit(handleSignUp, handleError)}>
          <IonGrid className="ion-padding">
            <IonRow>
              <IonCol>
                <IonLabel className="font-poppins">Full Name</IonLabel>
                <Form.Control
                  className="font-poppins"
                  data-bs-theme="dark"
                  disabled={registering}
                  isInvalid={getFieldState("fullName").invalid}
                  placeholder="Enter Full Name"
                  {...register("fullName")}
                  onChange={e => trigger("fullName")}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonLabel className="my-2">
                  <IonText className="font-poppins">Email Address</IonText>
                </IonLabel>
                <Form.Control
                  data-bs-theme="dark"
                  className="font-poppins"
                  disabled={registering}
                  isInvalid={getFieldState("email").invalid}
                  placeholder="Enter AdU Email"
                  {...register("email")}
                  onChange={e => trigger("email")}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonLabel className="font-poppins">Password</IonLabel>
                <InputGroup data-bs-theme="dark">
                  <Form.Control
                    className="font-poppins"
                    disabled={registering}
                    isInvalid={getFieldState("password").invalid}
                    type={showPass ? "password" : "text"}
                    {...register("password")}
                    onChange={e => trigger("password")}
                    placeholder="Enter Password"
                  />
                  <Button variant="outline-dark" onClick={togglePass}>
                    <IonIcon src={showPass ? eye : eyeOff}></IonIcon>
                  </Button>
                </InputGroup>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonLabel className="font-poppins">Confirm Password</IonLabel>
                <InputGroup data-bs-theme="dark">
                  <Form.Control
                    className="font-poppins"
                    disabled={registering}
                    isInvalid={getFieldState("passwordConfirmation").invalid}
                    type={showPass ? "password" : "text"}
                    {...register("passwordConfirmation")}
                    onChange={e => trigger("passwordConfirmation")}
                    placeholder="Repeat Password"
                  />
                  <Button variant="outline-dark" onClick={togglePass}>
                    <IonIcon src={showPass ? eye : eyeOff}></IonIcon>
                  </Button>
                </InputGroup>
              </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-center">
              <IonCol size="8">
                <IonText className="agreeToTerms  font-poppins">
                  I agree with Terms &amp; Conditions
                </IonText>
              </IonCol>
              <IonCol size="4" className="ion-text-end">
                <Controller
                  control={control}
                  name="agreeToTerms"
                  render={({ field: { onChange, value } }) => (
                    <IonCheckbox
                      disabled={registering}
                      checked={value}
                      onIonChange={(
                        e: CustomEvent<CheckboxChangeEventDetail>
                      ) => onChange(e.detail.checked)}
                    />
                  )}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12">
                <IonButton
                  expand="block"
                  type="submit"
                  className="font-poppins font-bold"
                  disabled={registering}
                >
                  {registering && <IonSpinner name="lines-small" className="mr-2" />}
                  Sign Up
                </IonButton>
                {/* <IonButton id="open-verification">
                  Verify
                </IonButton> */}
                <VerificationModal ref={otpModal} handleDismiss={dismissOtpModal} />
              </IonCol>
              <IonCol size="12" className="ion-text-center">
                <IonText className="font-poppins font-bold">or</IonText>
              </IonCol>
              <IonCol size="12">
                <BtnContinueWithGoogle onClick={handleGoogle} disabled={registering} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
      </IonContent>
    </IonModal>
  );
}
