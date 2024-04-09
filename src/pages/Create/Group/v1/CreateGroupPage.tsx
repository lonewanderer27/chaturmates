import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import "./CreateGroupPage.css";
import useCreateGroup from "../../../../hooks/group/useCreateGroup";

export default function CreateGroupPage() {
  const { handleCreate, success, register, handleSubmit, getValues } =
    useCreateGroup();

  const rt = useIonRouter();

  function handleBack() {
    console.log("handleBack");
    rt.push("/discover", "back");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={handleBack}>
              <IonIcon src={arrowBack}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Create Group</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Name
                </IonText>
              </IonLabel>
              <IonInput
                className="custom my-2 text-lg font-poppins"
                placeholder="Name of your group"
                type="text"
                {...register("name", { required: true })}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Description
                </IonText>
              </IonLabel>
              <IonTextarea
                autoGrow={true}
                className="custom my-2 font-poppins text-lg"
                placeholder="Description of your group"
                {...register("description", { required: true })}
              ></IonTextarea>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">Profile URL</IonText>
              </IonLabel>
              <IonInput
              placeholder="Profile picture of your group"
                className="custom my-2 font-poppins text-lg"
                type="text"
                {...register("avatar_url", { required: true })}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">Unique Name</IonText>
              </IonLabel>
              <IonInput
                className="custom my-2 font-poppins text-lg"
                type="text"
                placeholder="Link of your group"
                {...register("vanity_id", { required: true })}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12"></IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar className="p-2">
          <IonButton
            className="font-poppins font-bold"
            expand="block"
            onClick={handleSubmit(handleCreate)}
          >
            <span>Create Group</span>
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}
