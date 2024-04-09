import {IonButton, IonIcon, IonItem, IonLabel, IonList, IonText, useIonRouter} from "@ionic/react";
import {StudentType} from "../../types";
import StudentItem from "../Discover/Search/StudentItem";
import {chevronForward} from "ionicons/icons";

export default function PendingGroupMembers(props: {
  vanity_id?: string;
  members?: StudentType[];
  title?: string;
  handleApprove?: (student_id: number) => void;
  isLoading: boolean;
}) {
  const rt = useIonRouter();
  const handleViewPendingMembers = () => {
    rt.push(`/group/${props.vanity_id}/members/pending`, "forward");
  };

  return (
      <div className="ion-margin-vertical font-poppins">
        <IonList>
          <IonItem lines={"none"}>
            <IonText slot={"start"} className={'font-poppins text-lg font-bold'}>{props.title}</IonText>
            <IonButton slot={"end"} fill={"clear"} className={"mr-[-5px]"} onClick={handleViewPendingMembers}>

              <IonIcon src={chevronForward}/>
            </IonButton>
          </IonItem>
        </IonList>
        {props.members && props.members.length > 0 && (
            <IonList lines="inset">
              {props.members!.map((klasmeyt) => (
                  <StudentItem key={klasmeyt.id} student={klasmeyt}/>
              ))}
            </IonList>
        )}
        <IonList lines={"none"}>
          {props.isLoading && (
              <IonItem>
                <IonLabel className={'font-poppins'}>Loading...</IonLabel>
              </IonItem>
          )}
          {(!props.isLoading && props.members?.length === 0) && (
              <IonItem>
                <IonLabel className={'font-poppins'}>No pending klasmeyts</IonLabel>
              </IonItem>
          )}
        </IonList>
      </div>
  );
}

PendingGroupMembers.defaultProps = {
  title: "Pending Klasmeyts",
};
