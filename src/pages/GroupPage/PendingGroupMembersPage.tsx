import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonFabButton,
  IonGrid,
  IonIcon,
  IonPage,
  IonProgressBar,
  IonRow,
  IonSpinner,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { chevronBack, peopleCircleOutline } from "ionicons/icons";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useSelfStudent from "../../hooks/student/useSelfStudent";
import { getGroupByVanityUrl } from "../../services/group";
import { approveGroupMember } from "../../services/group/students";
import PendingGroupMembers from "../../components/Group/PendingGroupMembers";

export default function PendingGroupMembersPage() {
  const rt = useIonRouter();
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

  const handleBack = () => {
    if (rt.canGoBack()) {
      rt.goBack();
    }
    rt.push("/discover", "back");
  };

  const handleApprove = async (student_id: number) => {
    try {
      const res = await approveGroupMember(query.data!.group.id, student_id);
      console.log("approve res: ", res);
      query.refetch();
    } catch {
      console.log("error");
    }
  };

  console.log("pending group members: ", query.data?.students.pending);

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
            {/* <IonText className=" font-poppins text-center font-light text-lg">
              <p className="pageTitle">{query.data?.group?.name}</p>
              <p>Regular</p>
            </IonText>
            <IonText className="text-center ion-margin-vertical font-medium font-poppins">
              <p style={{ textAlign: "center" }} className="px-2">
                {query.data?.group?.description}
              </p>
            </IonText> */}
            <PendingGroupMembers
              handleApprove={handleApprove}
              members={query.data?.students.pending!}
            />
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
