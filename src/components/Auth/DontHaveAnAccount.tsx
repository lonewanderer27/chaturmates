import { IonRow, IonCol, IonText } from "@ionic/react";
import { Ref, useEffect, useRef, useState } from "react";
import SignupModal from "./SignupModal";

export default function DontHaveAnAccount(props: { handleClick: () => void }) {
  return (
    <IonRow>
      <IonCol size="8">
        <IonText className="font-poppins">Don't have an account?</IonText>
      </IonCol>
      <IonCol size="4" className="ion-text-end" onClick={props.handleClick}>
        <IonText color="primary" className="cursor-pointer font-bold font-poppins">
          Sign Up
        </IonText>
      </IonCol>
    </IonRow>
  );
}
