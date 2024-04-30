import React, {Ref, useState} from "react";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonModal,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {close, eye, eyeOff} from "ionicons/icons";
import {Button, Form, InputGroup} from "react-bootstrap";
import useChangePass from "../../hooks/me/useChangePass";

type IonModalProps = React.ComponentProps<typeof IonModal>;

enum passInputs {
  // oldPass = "oldPass",
  newPass = "newPass",
  confirmPass = "confirmPass"
}

// TODO: Convert this to swipeable modal (Android version)

export default function ChangePasswordModal(
    props: IonModalProps & {
      handleToggle: () => void;
      presentingElementRef: HTMLElement | undefined;
      modalRef: Ref<HTMLIonModalElement>;
    }
) {
  const [showPass, setShowPass] = useState({
    [passInputs.newPass]: false,
    [passInputs.confirmPass]: false
  });

  const togglePass = (key: passInputs) => {
    // log
    console.log("togglePass", key);

    setShowPass((show) => {
      return {
        ...show,
        [key]: !show[key]
      }
    });
  };

  const {
    handleSubmit,
    handleError,
    handleChangePass,
    register,
    getFieldState,
    trigger,
    processing,
    setValue
  } = useChangePass();

  return (
      <IonModal
          id="changePassModal"
          presentingElement={props.presentingElementRef}
          ref={props.modalRef}
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton disabled={processing} onClick={props.handleToggle}>
                <IonIcon src={close}></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle className="font-poppins">Change Password</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="signupPage ">
          <form onSubmit={handleSubmit(handleChangePass, handleError)}>
            <IonGrid className="ion-padding">
              <IonRow>
                <IonCol>
                  <IonLabel className="font-poppins">New Password</IonLabel>
                  <InputGroup data-bs-theme="dark">
                    <Form.Control
                        className="font-poppins"
                        disabled={processing}
                        isInvalid={getFieldState("newPass").invalid}
                        type={!showPass[passInputs.newPass] ? "password" : "text"}
                        {...register("newPass")}
                        onChange={e => setValue("newPass", e.target.value)}
                        placeholder="Enter New Password"
                    />
                    <Button variant="outline-dark" onClick={() => togglePass(passInputs.newPass)}>
                      <IonIcon src={!showPass[passInputs.newPass] ? eye : eyeOff}></IonIcon>
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
                        disabled={processing}
                        isInvalid={getFieldState("confirmPass").invalid}
                        type={!showPass[passInputs.confirmPass] ? "password" : "text"}
                        {...register("confirmPass")}
                        onChange={e => setValue("confirmPass", e.target.value)}
                        placeholder="Repeat Password"
                    />
                    <Button variant="outline-dark" onClick={() => togglePass(passInputs.confirmPass)}>
                      <IonIcon src={!showPass[passInputs.confirmPass] ? eye : eyeOff}></IonIcon>
                    </Button>
                  </InputGroup>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12">
                  <IonButton
                      expand="block"
                      type="submit"
                      className="font-poppins font-bold mt-3"
                      disabled={processing}
                  >
                    {processing && <IonSpinner name="lines-small" className="mr-2"/>}
                    Change Password
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </form>
        </IonContent>
      </IonModal>
  )
}