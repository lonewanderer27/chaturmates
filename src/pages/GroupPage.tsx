import "./Group.css";

import {
  IonButton,
  IonCard,
  IonContent,
  IonPage,
  IonProgressBar,
  IonRow,
  IonSpinner,
  IonText,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import {getGroupByVanityUrl, groupJoin, groupLeave} from "../services/group";
import {useEffect, useState} from "react";

import ApprovedGroupMembers from "../components/Group/ApprovedGroupMembers";
import GroupChatUrls from "../components/Group/GroupChatUrls";
import GroupDescription from "../components/Group/GroupDescription";
import GroupHeader from "../components/Group/GroupHeader";
import PendingGroupMembers from "../components/Group/PendingGroupMembers";
import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import useSelfStudent from "../hooks/student/useSelfStudent";

export default function GroupPage() {
  const rt = useIonRouter();
  const [show, close] = useIonLoading();
  const {student} = useSelfStudent();
  const [joining, setJoining] = useState(false);
  const {vanity_id} = useParams<{ vanity_id: string }>();

  const q = useQuery({
    queryKey: ["group", vanity_id],
    queryFn: async () => {
      const res = (await getGroupByVanityUrl(vanity_id)).data;
      return res;
    },
    enabled: !!vanity_id,
  });

  console.log("groupMembers: ", q.data?.members);
  console.log("admins", q.data?.admins);

  const [join, setJoin] = useState(true);

  useEffect(() => {
    const stud = q.data?.members?.all.find(
        (member) => member.student_id === student?.id
    );
    if (stud) {
      setJoin(true);
    } else {
      setJoin(false);
    }
  }, [q.data?.members]);

  const handleBack = () => {
    if (rt.canGoBack()) {
      rt.goBack();
    }
    rt.push("/discover", "back");
  };

  const handleMessage = () => {
    rt.push("/threads");
  };

  const delay = (delayInms: number) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };

  const handleJoin = async () => {
    setJoining(() => true);
    await delay(1000);
    try {
      const res = await groupJoin(
          student?.id!,
          q.data?.group?.id!,
          student!.profile_id!
      );
      console.log("join group: ", res.data);
      setJoining(() => false);
    } catch {
      setJoining(() => false);
    }

    await q.refetch();
    setJoining(() => false);
  };

  const handleLeave = async () => {
    setJoining(() => true);
    await delay(1000);
    try {
      const res = await groupLeave(
          student?.id!,
          q.data?.group?.id!,
          student!.profile_id!
      );
      console.log("leave group: ", res);
      setJoining(() => false);
    } catch {
      setJoining(() => false);
    }
    await q.refetch();
    setJoining(() => false);
  };



  return (
      <IonPage>
        <IonContent fullscreen className="groupPage">
          <IonCard className="groupPageCard">
            {q.isLoading && <IonProgressBar type="indeterminate"/>}
            <GroupHeader handleBack={handleBack} groupName={q.data?.group.name} isLoading={q.isLoading}/>
            {q.data && (
                <IonRow className="ion-justify-content-center ion-margin-vertical">
                  {!q.data.students.all.find(
                      (std) => std.id === student?.id
                  ) ? (
                      <IonButton
                          disabled={joining}
                          className="ion-margin-horizontal font-poppins"
                          shape="round"
                          size="small"
                          color="success"
                          onClick={handleJoin}
                      >
                        {joining ? (
                            <IonSpinner name="lines"/>
                        ) : (
                            <IonText>Join</IonText>
                        )}
                      </IonButton>
                  ) : (
                      <IonButton
                          disabled={joining}
                          className="ion-margin-horizontal font-poppins"
                          shape="round"
                          size="small"
                          color="danger"
                          onClick={handleLeave}
                      >
                        {joining ? (
                            <IonSpinner name="lines"/>
                        ) : (
                            <IonText>Leave</IonText>
                        )}
                      </IonButton>
                  )}
                  <IonButton
                      onClick={handleMessage}
                      className="ion-margin-horizontal font-poppins"
                      shape="round"
                      size="small"
                  >
                    <IonText>Message</IonText>
                  </IonButton>
                </IonRow>
            )}

            <GroupDescription isLoading={q.isLoading} groupDescription={q.data?.group.description}/>
            <ApprovedGroupMembers members={q.data?.students.approved!} isLoading={q.isLoading}/>
            <PendingGroupMembers vanity_id={q.data?.group.vanity_id} members={q.data?.students.pending} isLoading={q.isLoading}/>
            <GroupChatUrls groupChatUrls={q.data?.chat_urls} isLoading={q.isLoading}/>
          </IonCard>
        </IonContent>
      </IonPage>
  );
}
