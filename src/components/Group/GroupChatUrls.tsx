import {IonItem, IonLabel, IonList, IonText} from "@ionic/react";
import React, {useState} from "react";
import {GroupChatUrlType} from "../../types";

export default function GroupChatUrls(props: {
  groupChatUrls?: GroupChatUrlType[];
  isLoading: boolean;

}) {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((show) => !show);
  };

  return (
    <div className="ion-margin-vertical  font-poppins">
      <IonText className="ion-margin-vertical ion-padding-start text-lg font-bold">
        Group Chat Links
      </IonText>
      {props.groupChatUrls && props.groupChatUrls.length > 0 && (
        <IonList lines="inset">
          {showAll
            ? props.groupChatUrls!.map((gc) => (
                <a href={gc.link} target="_blank" rel="noreferrer">
                  {gc.title}
                </a>
              ))
            : props.groupChatUrls!.slice(0, 4).map((gc) => (
                <a href={gc.link} target="_blank" rel="noreferrer">
                  {gc.title}
                </a>
              ))}
        </IonList>
      )}
      <IonList lines={"none"}>
        {props.isLoading && (
            <IonItem>
              <IonLabel className={'font-poppins'}>Loading...</IonLabel>
            </IonItem>
        )}
        {(!props.isLoading && props.groupChatUrls?.length === 0) && (
            <IonItem>
              <IonLabel className={'font-poppins'}>No group chat links</IonLabel>
            </IonItem>
        )}
      </IonList>
      {props.groupChatUrls && props.groupChatUrls.length > 4 && (
        <IonText
          onClick={toggleShowAll}
          color="primary"
          className="ion-margin-vertical ion-padding-start cursor-pointer"
        >
          {showAll ? "Show Fewer Links" : "Show More Links"}
        </IonText>
      )}
    </div>
  );
}
