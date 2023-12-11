import { IonList, IonText, useIonRouter } from "@ionic/react";
import { StudentType } from "../../types";
import { useState } from "react";
import StudentItem from "./Search/StudentItem";

export default function StudentsResults(props: {
  klasmeyts: StudentType[];
  handleViewMore?: () => void;
}) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((show) => !show);
  };

  return (
    <div className="ion-margin-vertical px-0 font-poppins">
      <IonText className="pageTitle ion-margin-vertical ion-padding-start">
        Klasmeyts
      </IonText>
      <IonList>
        {showAll
          ? props.klasmeyts.map((klasmeyt, index) => (
              <StudentItem student={klasmeyt} key={klasmeyt.id} />
            ))
          : props.klasmeyts
              .slice(0, 4)
              .map((klasmeyt) => (
                <StudentItem student={klasmeyt} key={klasmeyt.id} />
              ))}
      </IonList>
      {props.klasmeyts.length === 0 && (
        <p className="ion-padding-start">No klasmeyts found.</p>
      )}
      {props.klasmeyts.length > 4 && (
        <IonText
          onClick={toggleShowAll}
          color="primary"
          className="ion-margin-vertical ion-padding-start cursor-pointer"
          {...props}
        >
          {showAll ? "Show Fewer Klasmeyts" : "Show More Klasmeyts"}
        </IonText>
      )}
    </div>
  );
}
