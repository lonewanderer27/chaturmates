import { IonText, IonList } from "@ionic/react";
import { StudentType } from "../../types";
import { useState } from "react";
import StudentItem from "./StudentItem";

export default function GroupMembers(props: { members?: StudentType[] }) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((show) => !show);
  };

  return (
    <div className="ion-margin-vertical">
      <IonText className="pageTitle ion-margin-vertical ion-padding-start">
        Klasmeyts
      </IonText>
      {props.members && props.members.length > 0 && (
        <IonList lines="inset">
          {showAll
            ? props.members!.map((klasmeyt) => (
                <StudentItem key={klasmeyt.id} {...klasmeyt} />
              ))
            : props.members!
                .slice(0, 3)
                .map((klasmeyt) => (
                  <StudentItem key={klasmeyt.id} {...klasmeyt} />
                ))}
        </IonList>
      )}
      {props.members && props.members.length > 3 && (
        <IonText
          onClick={toggleShowAll}
          color="primary"
          className="ion-margin-vertical ion-padding-start  cursor-pointer"
        >
          {showAll ? "Show Fewer Klasmeyts" : "Show More Klasmeyts"}
        </IonText>
      )}
    </div>
  );
}
