import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLoading,
  IonPage,
  IonProgressBar,
  IonRow,
  IonSpinner,
  IonText,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import {
  chevronBack,
  peopleCircleOutline,
  personCircleOutline,
} from "ionicons/icons";
import { GROUPS } from "../constants/groups";
import "./StudentPage.css";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getStudentById } from "../services/student";
import S from "string";
import GroupsResults from "../components/Discover/GroupsResults";
import useSelfStudent from "../hooks/student/useSelfStudent";
import { followStudent, unfollowStudent } from "../services/student/following";

export default function StudentPage() {
  const rt = useIonRouter();
  const [followOperation, setfollowOperation] = useState(() => false);
  const [follow, setFollow] = useState(() => false);

  // const toggleFollow = () => {
  //   setFollow(!follow);
  // };

  const { student } = useSelfStudent();
  const { student_id } = useParams<{ student_id: string }>();
  const query = useQuery({
    queryKey: ["student", student_id],
    queryFn: async () => {
      console.log("useQuery");
      const res = await getStudentById(student_id);
      console.log("data", res.data);
      return res.data;
    },
    enabled: !!student_id,
  });

  const handleBack = () => {
    if (rt.canGoBack()) {
      rt.goBack();
    }
    rt.push("/discover", "back");
  };

  const handleMessage = () => {
    rt.push(`/threads`, "forward");
  };

  const followed = useMemo(() => {
    // if the current student already follows this student
    // then set the follow button to followed
    // else set the follow button to follow

    // check if it's the current student
    if (student?.id === Number(student_id)) {
      return false;
    }

    if (!query.data) {
      return false;
    }

    const currentStudent = query.data?.followers?.find(
      (follower) => follower.id === student?.id
    );

    if (currentStudent) {
      return true;
    } else {
      return false;
    }
  }, [query.data]);

  const handleFollow = async () => {
    try {
      setfollowOperation(() => true);
      const res = await followStudent(student?.id + "", student_id);
      setfollowOperation(() => false);
      console.log("follow", res.data);
      if (res.data.student) {
        setfollowOperation(() => false);
        setFollow(() => true);
      }
    } catch {
      console.log("error");
      setfollowOperation(() => false);
    }
    query.refetch();
  };

  const handleUnfollow = async () => {
    setfollowOperation(() => true);
    try {
      const res = await unfollowStudent(student?.id + "", student_id);
      setFollow(() => false);
    } catch {
      console.log("error");
      setfollowOperation(() => false);
    }
    setfollowOperation(() => false);
    query.refetch();
  };

  return (
    <IonPage>
      <IonContent className="studentPage">
        <IonCard className="studentPageCard">
          {!query.data && <IonProgressBar type="indeterminate" />}
          {rt.canGoBack() && (
            <IonFabButton
              size="small"
              className="ml-3 mt-3 mb-[-70px]"
              onClick={handleBack}
            >
              <IonIcon src={chevronBack}></IonIcon>
            </IonFabButton>
          )}
          <IonGrid>
            <IonRow className="ion-justify-content-center ion-padding">
              {query.data?.student?.avatar_url ? (
                <IonCol size="4">
                  <img
                    className="studentPageLogo rounded-full"
                    src={query.data?.student.avatar_url}
                  />
                </IonCol>
              ) : (
                <IonIcon
                  className="studentPageIcon"
                  src={peopleCircleOutline}
                />
              )}
            </IonRow>
            <IonText className="text-center font-poppins font-light text-lg">
              <p className="pageTitle">{query.data?.student?.full_name}</p>
              {query.data && (
                <p>{S(query.data?.student.type).capitalize().s}</p>
              )}
            </IonText>
            {query.data && (
              <IonRow className="ion-justify-content-center ion-margin-vertical">
                <IonButton
                  // disabled
                  shape="round"
                  size="small"
                  className="ion-margin-horizontal font-poppins"
                  onClick={handleMessage}
                >
                  Message
                </IonButton>
                {!query.data?.followers?.find(
                  (follower) => follower.id === student?.id
                ) ? (
                  <>
                    <IonButton
                      disabled={followOperation}
                      shape="round"
                      size="small"
                      className="ion-margin-horizontal font-poppins"
                      onClick={handleFollow}
                    >
                      {followOperation ? <IonSpinner name="dots" /> : "Follow"}
                    </IonButton>
                  </>
                ) : (
                  <>
                    <IonButton
                      disabled={followOperation}
                      shape="round"
                      size="small"
                      className="ion-margin-horizontal font-poppins"
                      onClick={handleUnfollow}
                    >
                      {followOperation ? (
                        <IonSpinner name="dots" />
                      ) : (
                        "Unfollow"
                      )}
                    </IonButton>
                  </>
                )}
              </IonRow>
            )}
            <IonText className="studentDescription  ion-margin-vertical  font-poppins font-medium">
              <p style={{ textAlign: "center" }} className=" ion-padding">
                {query.data?.student?.description}
              </p>
            </IonText>
            <GroupsResults groups={query.data?.groups} />
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
