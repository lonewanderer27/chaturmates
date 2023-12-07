import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import "./Group.css";
import { peopleCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GroupMembers from "../components/Group/GroupMembers";
import useSelfStudent from "../hooks/student/useSelfStudent";
import { useQuery } from "@tanstack/react-query";
import { getGroupByVanityUrl } from "../services/group";

export default function GroupPage() {
  const [show, close] = useIonLoading();
  const { student } = useSelfStudent();
  const { vanity_url } = useParams<{ vanity_url: string }>();

  const query = useQuery({
    queryKey: ["group", vanity_url],
    queryFn: async () => {
      await show();
      const res = (await getGroupByVanityUrl(vanity_url)).data;
      await close();
      return res;
    },
    enabled: !!vanity_url,
  });
  
  console.log("groupMembers: ", query.data?.members);
  console.log("admins", query.data?.admins);

  const [join, setJoin] = useState(true);

  useEffect(() => {
    const stud = query.data?.members?.all.find(
      (member) => member.student_id === student?.id
    );
    if (stud) {
      setJoin(true);
    } else {
      setJoin(false);
    }
  }, [query.data?.members]);

  const toggleJoin = () => {
    setJoin(!join);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="groupPage">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        {/* TODO: Fix back button above this card */}
        <IonCard className="groupPageCard ion-padding">
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              {query.data?.group?.avatar_url ? (
                <IonCol size="4">
                  <img className="groupPageLogo" src={query.data!.group?.avatar_url} />
                </IonCol>
              ) : (
                <IonIcon
                  className="groupPageIcon"
                  src={peopleCircleOutline}
                ></IonIcon>
              )}
            </IonRow>
            <IonText className="pageTitle">
              <p style={{ textAlign: "center" }}>{query.data?.group?.name}</p>
            </IonText>
            <IonRow className="ion-justify-content-center  ion-margin-vertical">
              {join === false ? (
                <>
                  <IonButton
                    className="ion-margin-horizontal"
                    shape="round"
                    size="small"
                    color="success"
                    onClick={toggleJoin}
                  >
                    <IonText>Join</IonText>
                  </IonButton>
                </>
              ) : (
                <>
                  <IonButton
                    className="ion-margin-horizontal"
                    shape="round"
                    size="small"
                    color="danger"
                    onClick={toggleJoin}
                  >
                    <IonText>Leave</IonText>
                  </IonButton>
                </>
              )}
              <IonButton
                disabled
                className="ion-margin-horizontal"
                shape="round"
                size="small"
              >
                <IonText>Message</IonText>
              </IonButton>
            </IonRow>
            <IonText className="text-center ion-margin-vertical">
              <p style={{ textAlign: "center" }}>{query.data!.group?.description}</p>
            </IonText>
            <GroupMembers members={query.data?.students.all!} />
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
