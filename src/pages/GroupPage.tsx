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
  useIonRouter,
} from "@ionic/react";
import "./Group.css";
import { peopleCircleOutline, personCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useGroup from "../hooks/group/useGroup";
import useGroupMembers from "../hooks/group/useGroupMembers";
import GroupMembers from "../components/Group/GroupMembers";
import useSelfStudent from "../hooks/student/useSelfStudent";

export default function GroupPage() {
  const rt = useIonRouter();
  const { student } = useSelfStudent();
  const { vanity_url } = useParams<{ vanity_url: string }>();
  const { group } = useGroup(vanity_url);
  const { groupMembers } = useGroupMembers(group?.id ?? 0);

  console.log("groupMembers: ", groupMembers);

  const [join, setJoin] = useState(true);

  useEffect(() => {
    const stud = groupMembers.find(
      (member) => member.student_id === student?.id
    );
    if (stud) {
      setJoin(true);
    } else {
      setJoin(false);
    }
  }, [groupMembers]);

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
            <GroupMembers members={groupMembers} />
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
