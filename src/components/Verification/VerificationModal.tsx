import "./VerificationModal.css";

import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonModal, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react'
import React, { Ref } from 'react'

import OtpInput from 'react-otp-input';
import { close } from 'ionicons/icons'
import useVerify from '../../hooks/verification/useVerify';

const VerificationModal = React.forwardRef((props: {
  email?: string,
  handleDismiss?: () => void
}, ref: Ref<HTMLIonModalElement>) => {

  const { handleVerify, otp, setOtp } = useVerify();

  return (
    <IonModal trigger="open-verification" ref={ref} initialBreakpoint={0.45} breakpoints={[0, 0.45]} backdropBreakpoint={0}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={props.handleDismiss}>
              <IonIcon src={close}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle className="font-poppins">Email Verification</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonText className="font-poppins">
          Please check your email. We've sent a code to <b>{props.email}</b>
        </IonText>
        <div className="flex justify-center flex-col text-center">
        <OtpInput
          numInputs={6}
          inputType='tel'
          value={otp}
          onChange={e => setOtp(e)}
          containerStyle={"flex flex-row justify-center mt-3"}
          inputStyle={"border-2 mx-1 rounded-full w-25 font-poppins text-center text-5xl"}
          renderInput={(props) => <input {...props} />}
        />
        <br/>
        <IonText className="font-poppins">
          Didn't get a code? <IonText color="primary" className=" cursor-pointer">Resend</IonText>
        </IonText>
        </div>
      </IonContent>
    </IonModal>
  )
})

VerificationModal.defaultProps = {
  email: "keitarojay27@protonmail.ch"
}

export default VerificationModal;