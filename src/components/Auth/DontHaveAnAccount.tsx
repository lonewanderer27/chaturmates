import { IonRow, IonCol, IonText } from "@ionic/react";
import { Ref, useEffect, useRef, useState } from "react";
import SignupModal from "./SignupModal";

export default function DontHaveAnAccount(props: {
  handleClick: () => void;
}) {

  return (
    <>
      <IonRow>
        <IonCol size="6">Don't have an account?</IonCol>
        <IonCol size="6" className="ion-text-end" onClick={props.handleClick}>
          <IonText color="primary" className="cursor-pointer">
            Sign up
          </IonText>
        </IonCol>
      </IonRow>
    </>
  );
}
