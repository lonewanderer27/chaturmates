import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import TitleBar from "../components/TitleBar";
import DontHaveAnAccount from "../components/Auth/DontHaveAnAccount";
import { close, toggle } from "ionicons/icons";
import { useHistory } from "react-router";
import { useState, useEffect, useRef } from "react";
import SignupModal from "../components/Auth/SignupModal";
import { client } from "../client";
import useSession from "../hooks/auth/useSession";

export default function ForgotMyPassword() {
  const { session } = useSession();
  const page = useRef<HTMLElement>();
  const hst = useHistory();

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


  const handleForgotPass = async () => {
    // TODO: implement logic
    const response = await client.auth.resetPasswordForEmail(session?.user.email!);

    if (response.data) {
      console.log("response.data", response.data);
      // if the backend returns success, then
      // push the user to forgot my pass confirm page
      hst.push("/forgotmypassconfirm");
    }
  }

  return (
    <IonPage ref={page}>
      <IonContent fullscreen className="forgotMyPassPage">
        <TitleBar />
        <IonGrid className="ion-padding">
          <IonRow>
            <IonButton
              fill="clear"
              onClick={() =>
                hst.push("/login", {
                  direction: "back",
                })
              }
            >
              <IonIcon src={close} />
            </IonButton>
          </IonRow>
          <IonText>
            <h1>Oh no, I forgot!</h1>
          </IonText>
          <IonText>
            <p>
              Enter your email, or username and we'll send you a link to change
              a new password
            </p>
          </IonText>
          <IonRow>
            <IonCol size="12">
              <IonInput
                label="Email or username"
                labelPlacement="stacked"
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonButton expand="block" onClick={handleForgotPass}>
                <IonText>
                  Forgot Password
                </IonText>
              </IonButton>
            </IonCol>
          </IonRow>
          <DontHaveAnAccount handleClick={toggleShowSignup} />
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
