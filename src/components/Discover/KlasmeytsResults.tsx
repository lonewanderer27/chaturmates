import { IonList, IonText, useIonRouter } from "@ionic/react";
import KlasmeytItem from "./StudentItem";
import { StudentType } from "../../types";
import { useState } from "react";

export default function StudentsResults(props: {
  klasmeyts: StudentType[];
  handleViewMore?: () => void;
}) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((show) => !show);
  };

  return (
    <div className="ion-margin-vertical">
      <IonText className="pageTitle ion-margin-vertical ion-padding-start">
        Klasmeyts
      </IonText>
      <IonList>
        {showAll
          ? props.klasmeyts.map((klasmeyt, index) => (
              <KlasmeytItem
                key={klasmeyt.id}
                studentId={klasmeyt.id}
                slug={"klasmeyt-" + index}
                studentName={klasmeyt.full_name! + ""}
                studentType={klasmeyt.type ?? "Regular"}
              />
            ))
          : props.klasmeyts
              .slice(0, 3)
              .map((klasmeyt, index) => (
                <KlasmeytItem
                  key={klasmeyt.id}
                  studentId={klasmeyt.id}
                  slug={"klasmeyt-" + index}
                  studentName={klasmeyt.full_name! + ""}
                  studentType={klasmeyt.type ?? "Regular"}
                />
              ))}
      </IonList>
      {props.klasmeyts.length === 0 && (
        <p className="ion-padding-start">No klasmeyts found.</p>
      )}
      {props.klasmeyts.length > 3 && (
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

StudentsResults.defaultProps = {
  klasmeyts: [
    { studentName: "Johnna Doe", studentType: "Regular" },
    { studentName: "Johnna Doe", studentType: "Regular" },
    { studentName: "Johnna Doe", studentType: "Regular" },
  ],
};
