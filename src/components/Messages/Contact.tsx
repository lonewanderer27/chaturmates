import { IonAvatar, IonIcon, useIonRouter } from "@ionic/react";
import { peopleCircleOutline } from "ionicons/icons";
import { StudentType } from "../../types";
import "./Contact.css";
import { useHistory } from "react-router";

export default function Contact(props: StudentType) {
  const rt = useHistory();
  function handleClick() {
    rt.push(`/threads/${props.id}`);
  }

  return (
    <div
      className="flex justify-center flex-col w-20 text-center cursor-pointer"
      onClick={handleClick}
    >
      <IonAvatar>
        <IonIcon className="contactIcon" src={peopleCircleOutline}></IonIcon>
      </IonAvatar>
      <p className="truncate mt-5 text-sm">{props.full_name}</p>
    </div>
  );
}
