import { IonText, IonList } from "@ionic/react";
import { GroupMemberType } from "../../types";
import MemberItem from "./MemberItem";
import { useState } from "react";

export default function GroupMembers(props: { members: GroupMemberType[] }) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((show) => !show);
  };

  return (
    <div className="ion-margin-vertical">
      <IonText className="pageTitle ion-margin-vertical ion-padding-start">
        Klasmeyts
      </IonText>
      {props.members.length > 0 && (
        <IonList lines="inset">
          {showAll
            ? props.members.map((klasmeyt) => (
                <MemberItem key={klasmeyt.id} {...klasmeyt} />
              ))
            : props.members
                .slice(0, 3)
                .map((klasmeyt) => (
                  <MemberItem key={klasmeyt.id} {...klasmeyt} />
                ))}
        </IonList>
      )}
      {props.members.length > 3 && (
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
