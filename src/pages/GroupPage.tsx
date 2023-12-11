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
  IonPage,
  IonProgressBar,
  IonRow,
  IonText,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import "./Group.css";
import { chevronBack, peopleCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import GroupMembers from "../components/Group/GroupMembers";
import useSelfStudent from "../hooks/student/useSelfStudent";
import { useQuery } from "@tanstack/react-query";
import { getGroupByVanityUrl } from "../services/group";

export default function GroupPage() {
  const rt = useIonRouter();
  const [show, close] = useIonLoading();
  const { student } = useSelfStudent();
  const { vanity_id } = useParams<{ vanity_id: string }>();

  const query = useQuery({
    queryKey: ["group", vanity_id],
    queryFn: async () => {
      const res = (await getGroupByVanityUrl(vanity_id)).data;
      return res;
    },
    enabled: !!vanity_id,
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

  const handleBack = () => {
    if (rt.canGoBack()) {
      rt.goBack();
    }
    rt.push("/discover", "back");
  };

  const toggleJoin = () => {
    setJoin(!join);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="groupPage">
        <IonCard className="groupPageCard">
          {!query.data && <IonProgressBar type="indeterminate" />}
          {
            <IonFabButton
              size="small"
              className="ml-3 mt-3 mb-[-70px]"
              onClick={handleBack}
            >
              <IonIcon src={chevronBack}></IonIcon>
            </IonFabButton>
          }
          <IonGrid>
            <IonRow className="ion-justify-content-center ion-padding">
              {query.data?.group?.avatar_url ? (
                <IonCol size="4">
                  <img
                    className="groupPageLogo rounded-full"
                    src={query.data?.group?.avatar_url}
                  />
                </IonCol>
              ) : (
                <IonIcon
                  className="groupPageIcon"
                  src={peopleCircleOutline}
                ></IonIcon>
              )}
            </IonRow>
            <IonText className=" font-poppins text-center font-light text-lg">
              <p className="pageTitle">{query.data?.group?.name}</p>
              <p>Regular</p>
            </IonText>
            {query.data && (
              <IonRow className="ion-justify-content-center ion-margin-vertical">
                {join === false ? (
                  <>
                    <IonButton
                      className="ion-margin-horizontal font-poppins"
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
                      className="ion-margin-horizontal font-poppins"
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
                  className="ion-margin-horizontal font-poppins"
                  shape="round"
                  size="small"
                >
                  <IonText>Message</IonText>
                </IonButton>
              </IonRow>
            )}
            <IonText className="text-center ion-margin-vertical font-medium font-poppins">
              <p style={{ textAlign: "center" }} className="px-2">
                {query.data?.group?.description}
              </p>
            </IonText>
            <GroupMembers members={query.data?.students.all!} />
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
