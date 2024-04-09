import {IonCol, IonFabButton, IonIcon, IonRow, IonText} from "@ionic/react";
import {chevronBack, peopleCircleOutline} from "ionicons/icons";

export default function GroupHeader(props: {
  handleBack: () => void;
  groupName?: string;
  isLoading: boolean;
  avatarUrl?: string;
}) {
  return (
      <>
        {!props.isLoading && (
            <IonFabButton size="small" className="ml-3 mt-3 mb-[-70px]" onClick={props.handleBack}>
              <IonIcon src={chevronBack}></IonIcon>
            </IonFabButton>
        )}
        <IonRow className="ion-justify-content-center ion-padding mt-2">
          {props.avatarUrl ? (
              <IonCol size="4">
                <img
                    className="groupPageLogo rounded-full"
                    src={props.avatarUrl}
                />
              </IonCol>
          ) : (
              <IonIcon
                  className="groupPageIcon"
                  src={peopleCircleOutline}
              ></IonIcon>
          )}
        </IonRow>
        <IonText className="font-poppins text-center font-light text-lg">
          <p className="pageTitle">{props.groupName}</p>
          <p>Regular</p>
        </IonText>
      </>
  )
}