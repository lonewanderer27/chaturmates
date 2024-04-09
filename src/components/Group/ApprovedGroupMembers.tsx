import {IonItem, IonLabel, IonList, IonText} from "@ionic/react";
import {StudentType} from "../../types";
import {useState} from "react";
import StudentItem from "../Discover/Search/StudentItem";

export default function ApprovedGroupMembers(props: {
  members?: StudentType[];
  isLoading: boolean;
}) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((show) => !show);
  };

  return (
    <div className="ion-margin-vertical  font-poppins">
      <IonText className="pageTitle ion-margin-vertical ion-padding-start">
        Klasmeyts
      </IonText>
      {props.members && props.members.length > 0 && (
        <IonList lines="inset">
          {showAll
            ? props.members!.map((klasmeyt) => (
                <StudentItem key={klasmeyt.id} student={klasmeyt} />
              ))
            : props
                .members!.slice(0, 4)
                .map((klasmeyt) => (
                  <StudentItem key={klasmeyt.id} student={klasmeyt} />
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
              <IonLabel className={'font-poppins'}>No klasmeyts</IonLabel>
            </IonItem>
        )}
      </IonList>
      {props.members && props.members.length > 4 && (
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
