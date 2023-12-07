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
import { peopleCircleOutline, personCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import useGroup from "../hooks/group/useGroup";
import useGroupMembers from "../hooks/group/useGroupMembers";
import GroupMembers from "../components/Group/GroupMembers";
import useSelfStudent from "../hooks/student/useSelfStudent";
import { useQuery } from "@tanstack/react-query";
import GroupHTTPServices from "@/services/group.service";
import Students from "../components/Group/GroupMembers";

export default function GroupPage() {
  const [show, close] = useIonLoading();
  const rt = useHistory();
  const { student } = useSelfStudent();
  const { vanity_url } = useParams<{ vanity_url: string }>();
  const { group } = useGroup(vanity_url);
  // const { groupMembers } = useGroupMembers(group?.id ?? 0);

  const query = useQuery({
    queryKey: ['group', vanity_url],
    queryFn: async () => {
      await show();
      const res =  (await GroupHTTPServices.getByVanityUrl(vanity_url)).data.data;
      await close();
      return res;
    }
  })

  console.log("groupMembers: ", query.data?.members);

  const [join, setJoin] = useState(true);

  useEffect(() => {
    const stud = query.data?.members.all.find(
      (member) => member.student_id === student?.id
    );
    if (stud) {
      setJoin(true);
    } else {
      setJoin(false);
    }
  }, [query.data?.members.all, student?.id]);

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
              {group?.avatar_url ? (
                <IonCol size="4">
                  <img className="groupPageLogo" src={group?.avatar_url} />
                </IonCol>
              ) : (
                <IonIcon
                  className="groupPageIcon"
                  src={peopleCircleOutline}
                ></IonIcon>
              )}
            </IonRow>
            <IonText className="pageTitle">
              <p style={{ textAlign: "center" }}>{group?.name}</p>
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
              <p style={{ textAlign: "center" }}>{group?.description}</p>
            </IonText>
            <Students members={query.data?.students.all!} />
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
