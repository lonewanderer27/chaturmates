import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import "./Me.css";
import { client } from "../client";
import { useQuery } from "@tanstack/react-query";
import useProfile from "@/hooks/profile/useProfile";
import StudentHTTPServices from "@/services/student.service";

function MePage() {
  const handleLogout = () => {
    client.auth.signOut();
  };
  const { profile } = useProfile();

  const query = useQuery({
    queryKey: ["self_student", profile?.id],
    queryFn: async () => {
      console.log("useSelfStudent queryFn");
      const res = (await StudentHTTPServices.getByProfileId(profile!.id)).data
        .data
      console.log("useSelfStudent queryFn res", res);
      return res;
    },
    enabled: !!profile,
  });

  console.log("data", query.data);
  console.log("isLoading", query.isLoading);
  console.log("error", query.error);

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonText slot="start" className="pageTitle">
              Profile
            </IonText>
          </IonToolbar>
        </IonHeader>
        <IonButton onClick={handleLogout} expand="block">
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default MePage;
