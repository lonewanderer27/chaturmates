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
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

import OtpInput from 'react-otp-input';
import TitleBar from "../components/TitleBar";
import {useEffect} from "react";
import useSelfStudent from "../hooks/student/useSelfStudent";
import useVerify from "../hooks/verification/useVerify";

export default function Verification() {
  const {student} = useSelfStudent();
  const {handleVerify, otp, setOtp, sending, handleSend} = useVerify();

  useEffect(() => {
    if (student?.verified == false) {
      handleSend();
    }
  }, [student])

  return (
      <IonPage>
        <IonContent fullscreen className="verifyPage ">
          <TitleBar/>
          <IonGrid className="ion-padding">
            <IonRow className="mb-3">
              <IonText>
                <h1 className="text-2xl font-semibold  font-poppins">
                  Email Verification
                </h1>
              </IonText>
            </IonRow>
            <IonText className="font-poppins">
              Please check your email. We have sent a code to <b>{student?.school_email}</b>
            </IonText>
            <div className="flex justify-center flex-col text-center">
              <OtpInput
                  onPaste={() => handleVerify()}
                  numInputs={6}
                  inputType='tel'
                  value={otp}
                  onChange={e => {
                    setOtp(e)
                    if (e.length == 6) {
                      handleVerify(e);
                    }
                  }}
                  containerStyle={"flex flex-row justify-center mt-3"}
                  inputStyle={"border-2 mx-1 rounded-full w-25 font-poppins text-center text-5xl"}
                  renderInput={(props) => <input disabled={sending} {...props} />}
              />
              <br/>
              {sending && <IonText className="font-poppins">Sending OTP...</IonText>}
              {!sending && <IonText className="font-poppins" onClick={() => handleSend()}>Didn't receive the code? <span
                  className={"underline primary"}>Resend</span></IonText>}
            </div>
          </IonGrid>
        </IonContent>
      </IonPage>
  );
}
