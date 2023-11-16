import { IonCard, IonCol, IonIcon, IonLabel, useIonRouter } from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import "./AddGroupCard.css";
import useCreateGroupModal from "../../hooks/group/useCreateGroupModal";

export default function AddGroupCard() {
  const rt = useIonRouter()
  function handleClick() {
    // setShowCreateGroup(true);
    rt.push("/create/group");
  }

  return (
    <IonCol size="6" className="flex flex-column w-full cursor-pointer">
      <IonCard
        className="groupCard ion-padding ion-no-margin w-full flex flex-col  align-items-center justify-center text-center"
        onClick={handleClick}
      >
        <IonIcon className="addIcon mx-auto" src={addCircleOutline}></IonIcon>
        <IonLabel className="my-2">Create new Group</IonLabel>
      </IonCard>
    </IonCol>
  );
}
