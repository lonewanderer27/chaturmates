import { IonList, IonText, useIonRouter } from "@ionic/react";
import GroupItem from "./GroupItem";
import "./GroupItem.css";
import { GroupType } from "../../types";
import { useState } from "react";

export default function GroupsResults(props: {
  groups: GroupType[];
  handleViewMore?: () => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => {
    setShowAll((show) => !show);
  };

  return (
    <div className="ion-margin-vertical">
      <IonText className="pageTitle ion-margin-vertical ion-padding-start">
        Groups
      </IonText>
      {props.groups.length > 0 && (
        <IonList>
          {showAll ? (
            <>
              {props.groups.map((group) => (
                <GroupItem
                  key={"group:" + group.id}
                  groupId={group.id}
                  slug={group.vanity_url}
                  groupType={"Regular"}
                  groupName={group.name}
                />
              ))}
            </>
          ) : (
            <>
              {props.groups.slice(0, 3).map((group) => (
                <GroupItem
                  key={"group:" + group.id}
                  groupId={group.id}
                  slug={group.vanity_url}
                  groupType={"Regular"}
                  groupName={group.name}
                />
              ))}
            </>
          )}
        </IonList>
      )}
      {props.groups.length === 0 && (
        <p className="ion-padding-start">No groups found.</p>
      )}
      {props.groups.length > 3 && (
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

GroupsResults.defaultProps = {
  groups: [
    {
      groupName: "Software Engineering The Best",
      groupType: "Irregular",
      groupCount: 27,
      slug: "software_engineering_the_best",
    },
    {
      groupName: "Group ni Jay",
      groupType: "Regular",
      groupCount: 10,
      slug: "group_ni_jay",
    },
    {
      groupName: "Potato Corner",
      groupType: "Regular",
      groupCount: 7,
      slug: "potato_corner",
    },
  ],
};
