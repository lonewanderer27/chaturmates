import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
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
import "./GroupCreatePage.css";
import useCreateGroup from "../../hooks/group/useCreateGroup";

export default function GroupCreatePage() {
  const { handleCreate, success, register, handleSubmit, getValues } =
    useCreateGroup();

  const rt = useIonRouter();

  function handleBack() {
    console.log("handleBack");
    rt.push("/discover");
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
          <IonTitle>Create New Group</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText>Name</IonText>
              </IonLabel>
              <IonInput
                className="custom"
                type="text"
                {...register("name", { required: true })}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText>Description</IonText>
              </IonLabel>
              <IonTextarea
                autoGrow={true}
                className="custom"
                {...register("description", { required: true })}
              ></IonTextarea>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText>Profile URL</IonText>
              </IonLabel>
              <IonInput
                className="custom"
                type="text"
                {...register("avatar_url", { required: true })}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText>Unique Name</IonText>
              </IonLabel>
              <IonInput
                className="custom"
                type="text"
                {...register("vanity_url", { required: true })}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <IonButton expand="block" onClick={handleSubmit(handleCreate)}>
                <span>Create Group</span>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
