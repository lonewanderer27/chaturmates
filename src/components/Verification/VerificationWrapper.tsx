import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import TitleBar from "../TitleBar";
import { useEffect, useState } from "react";
import { ProfileType, StudentType } from "../../types";
import useSession from "../../hooks/auth/useSession";
import { client } from "../../client";

export default function VerificationWrapper() {
  const { session } = useSession();
  const [student, setStudent] = useState<StudentType>();
  const [profile, setProfile] = useState<ProfileType>();

  useEffect(() => {
    (async () => {
      if (session) {
        
      }
    })();
  }, [session]);

  return (
    <IonPage>
      <IonContent fullscreen className="verifyPage">
        <TitleBar />
      </IonContent>
    </IonPage>
  );
}
