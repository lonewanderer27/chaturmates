import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import {useEffect, useRef, useState} from "react";

import DontHaveAnAccount from "../components/Auth/DontHaveAnAccount";
import SignupModal from "../components/Auth/SignupModal";
import TitleBar from "../components/TitleBar";
import {client} from "../client";
import {close} from "ionicons/icons";
import {passwordResetEmailAtom} from "../atoms/auth";
import {useAtom} from "jotai";
import {useHistory} from "react-router";

export default function ForgotMyPassword() {
  const [show, hide] = useIonAlert();
  const page = useRef<HTMLElement>();
  const hst = useHistory();
  const rt = useIonRouter();

  const modal = useRef<HTMLIonModalElement>(null);

  const [presentingElement, setPresentingElement] = useState<
      HTMLElement | undefined
  >();
  const [showSignup, setShowSignup] = useState(false);

  const toggleShowSignup = () => {
    console.log("toggleShowSignup");

    if (showSignup) {
      modal.current?.dismiss();
    } else {
      modal.current?.present();
    }

    setShowSignup((show) => !show);
  };

  useEffect(() => {
    setPresentingElement(page.current);
    return () => {
      setPresentingElement(undefined);
    };
  }, []);

  const [processing, setProcessing] = useState(false);
  const [resetEmail, setResetEmail] = useAtom(passwordResetEmailAtom);

  const handleForgotPass = async () => {
    // set processing to true
    setProcessing(true);

    const response = await client.auth.resetPasswordForEmail(
        resetEmail!,
        {
          redirectTo: "/me",
        }
    );

    if (response.error) {
      console.log("forgotpass error", response.error);
      show({
        header: "Error",
        message: response.error.message,
        buttons: ["Ok"],
      });
      setProcessing(false);
      return;
    }

    // if the backend returns success, then
    // push the user to forgot my pass confirm page
    console.log("forgotpass response", response);
    setResetEmail(null);
    setProcessing(false);
    hst.push("/forgotpass/confirm");
  };

  return (
      <IonPage ref={page}>
        <IonContent fullscreen className="forgotMyPassPage">
          <TitleBar/>
          <IonGrid className="ion-padding">
            <IonRow>
              <IonButton
                  className="ml-[-18px]"
                  fill="clear"
                  onClick={() =>
                      hst.push("/login", {
                        direction: "back",
                      })
                  }
              >
                <IonIcon src={close}/>
              </IonButton>
            </IonRow>
            <IonRow className="px-1">
              <IonText>
                <h1 className="text-2xl font-semibold  font-poppins">
                  Oh no, I forgot!
                </h1>
              </IonText>
              <IonText className=" font-poppins">
                <p>
                  Enter your email, or username and we'll send you a link to
                  change a new password
                </p>
              </IonText>
            </IonRow>
            <IonRow className="mt-4">
              <IonCol size="12">
                <IonLabel className="my-2">
                  <IonText className=" font-poppins">Email </IonText>
                </IonLabel>
                <IonInput disabled={processing} type="email" onIonInput={e => setResetEmail(e.target.value + '')}
                          value={resetEmail}
                          className="custom my-1 font-poppins" placeholder="Enter Email"></IonInput>
              </IonCol>
            </IonRow>
            <IonRow className="mb-4">
              <IonCol size="12">
                <IonButton
                    expand="block"
                    onClick={handleForgotPass}
                    className="font-poppins font-bold"
                    disabled={resetEmail?.length === 0 || processing}
                >
                  {processing && <IonSpinner name="lines-small"/>}
                  Send Reset Link
                </IonButton>
              </IonCol>
            </IonRow>
            <DontHaveAnAccount handleClick={toggleShowSignup}/>
            <SignupModal
                handleToggle={toggleShowSignup}
                presentingElementRef={presentingElement}
                modalRef={modal}
            />
          </IonGrid>
        </IonContent>
      </IonPage>
  );
}
