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
  IonModal,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ComponentProps, Ref } from "react";
import useCreateGroup from "../../hooks/group/useCreateGroup";
import { close } from "ionicons/icons";
import useCreateGroupModal from "../../hooks/group/useCreateGroupModal";

type IonModalProps = ComponentProps<typeof IonModal>;

export default function GroupCreateModal(
  props: IonModalProps & {
    handleToggle: () => void;
    presentingElementRef: HTMLElement | undefined;
    modalRef: Ref<HTMLIonModalElement>;
  }
) {
  const {
    handleCreate,
    success,
    register,
    handleSubmit,
  } = useCreateGroup();

  return (
    <IonModal
      id="groupCreateModal"
      presentingElement={props.presentingElementRef}
      ref={props.modalRef}
    >
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={props.handleToggle}>
              <IonIcon src={close}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>Sign up</IonTitle>
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
              <IonInput
                className="custom"
                type="text"
                {...register("description", { required: true })}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText>Vanity URL</IonText>
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
                Create Group
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonModal>
  );
}
