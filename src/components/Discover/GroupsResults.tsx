import { IonList, IonText, useIonRouter } from "@ionic/react";
import GroupItem from "./Search/GroupItem";
import "./Search/GroupItem.css";
import { GroupType } from "../../types";
import { useState } from "react";
import { GroupResponse } from "../../types/group";

export default function GroupsResults(props: {
  groups?: GroupResponse["get"]["data"]["group"][];
  handleViewMore?: () => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll((show) => !show);
  };

  return (
    <div className="ion-margin-vertical px-0 font-poppins">
      <IonText className="pageTitle ion-margin-vertical ion-padding-start">
        Groups
      </IonText>
      {props.groups && props.groups.length > 0 && (
        <IonList lines="none">
          {showAll ? (
            <>
              {props.groups.map((group) => (
                <GroupItem group={group} key={group.id} />
              ))}
            </>
          ) : (
            <>
              {props.groups.slice(0, 3).map((group) => (
                <GroupItem group={group} key={group.id} />
              ))}
            </>
          )}
        </IonList>
      )}
      {props.groups && props.groups.length === 0 && (
        <p className="ion-padding-start">No groups found.</p>
      )}
      {props.groups && props.groups.length > 3 && (
        <IonText
          onClick={toggleShowAll}
          color="primary"
          className="ion-margin-vertical ion-padding-start cursor-pointer"
        >
          {showAll ? "See Fewer Groups" : "See More Groups"}
        </IonText>
      )}
    </div>
  );
}
