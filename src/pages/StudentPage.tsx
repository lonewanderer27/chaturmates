import {
  IonAvatar,
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
} from "@ionic/react";
import { peopleCircleOutline, personCircleOutline } from "ionicons/icons";
import { GROUPS } from "../constants/groups";
import "./StudentPage.css";
import { useState } from "react";
import useStudent from "../hooks/student/useStudent";
import { useParams } from "react-router";

export default function StudentPage() {
  const [follow, setFollow] = useState(false);

  const toggleFollow = () => {
    setFollow(!follow);
  };

  const { student_id } = useParams<{ student_id: string }>();
  const { student } = useStudent(student_id);

  return (
    <IonPage>
      <IonContent className="studentPage">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonButtons>
              <IonBackButton></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        {/* TODO: Fix back button above this card */}
        <IonCard className="studentPageCard ion-padding">
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              {student?.avatar_url ? (
                <IonCol size="4">
                  <img className="studentPageLogo" src={student.avatar_url} />
                </IonCol>
              ) : (
                <IonIcon
                  className="studentPageIcon"
                  src={peopleCircleOutline}
                />
              )}
            </IonRow>
            <IonText className="pageTitle">
              <p style={{ textAlign: "center" }}>{student?.full_name}</p>
            </IonText>
            <IonRow className="ion-justify-content-center ion-margin-vertical">
              <IonButton
                disabled
                shape="round"
                size="small"
                className="ion-margin-horizontal"
              >
                Message
              </IonButton>
              {follow === false ? (
                <>
                  <IonButton
                    shape="round"
                    size="small"
                    className="ion-margin-horizontal"
                    onClick={toggleFollow}
                  >
                    Follow
                  </IonButton>
                </>
              ) : (
                <>
                  <IonButton
                    color="success"
                    shape="round"
                    size="small"
                    className="ion-margin-horizontal"
                    onClick={toggleFollow}
                  >
                    Followed
                  </IonButton>
                </>
              )}
            </IonRow>
            <IonText className="studentDescription  ion-margin-vertical">
              <p style={{ textAlign: "center" }}>{student?.description}</p>
            </IonText>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

StudentPage.defaultProps = {
  slug: "johnna_doe",
  icon: personCircleOutline,
  logo: "/johnna_doe.png",
  studentName: "Johnna Doe",
  studentDescription:
    "I'm Johnna Doe, and I'm passionate about soaking up knowledge like a sponge. \n\nYou'll usually find me buried in my books, diving into subjects that fascinate me. \n\nI take pride in my commitment to learning and strive for excellence in everything I do.",
  studentType: "Regular",
  groups: [
    {
      name: GROUPS.SOFTWARE_ENGINEERING_THE_BEST.groupName,
      icon: GROUPS.SOFTWARE_ENGINEERING_THE_BEST.icon,
    },
    {
      name: GROUPS.GROUP_NI_JAY.groupName,
      icon: GROUPS.GROUP_NI_JAY.icon,
    },
    {
      name: GROUPS.POTATO_CORNER.groupName,
      icon: GROUPS.POTATO_CORNER.icon,
    },
    {
      name: GROUPS.BURGER_KING.groupName,
      icon: GROUPS.BURGER_KING.icon,
    },
    {
      name: GROUPS.JOLLIBEE.groupName,
      icon: GROUPS.JOLLIBEE.icon,
    },
  ],
};
