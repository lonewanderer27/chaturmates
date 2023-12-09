import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonRouter,
} from "@ionic/react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { GroupCreateInputs } from "../../../../types/group";
import { arrowBack } from "ionicons/icons";
import { useAtom } from "jotai";
import { newGroupAtom } from "../../../../atoms/groups";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { client } from "../../../../client";

export default function CreateGroupP1() {
  const [show, dismiss] = useIonAlert();
  const rt = useIonRouter();
  const validationSchema = object().shape({
    name: string().required("Name of the group is required").min(3),
    description: string()
      .required("Description of the group is required")
      .min(3),
  });
  const [nameChecking, setNameChecking] = useState(() => false);
  const [newGroup, setNewGroup] = useAtom(newGroupAtom);

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    getFieldState,
    getValues,
    formState: { errors },
    control,
  } = useForm<GroupCreateInputs["step1"]>({
    resolver: yupResolver(validationSchema),
    defaultValues: newGroup.step1
  });

  const handleBack = () => {
    console.log("handleBack");
    rt.push("/discover", "back");
  };

  const handleError: SubmitErrorHandler<GroupCreateInputs["step1"]> = (
    errors,
    event
  ) => {
    console.log("handleError");
    console.log(errors);
  };

  const handleNext: SubmitHandler<GroupCreateInputs["step1"]> = async (
    data
  ) => {
    setNameChecking(() => true);
    console.log("handleNext");
    console.log(data);

    // set group name and description in the atom
    setNewGroup((prev) => {
      return {
        ...prev,
        step1: data,
      };
    });

    // check if the name exists
    console.log("checking if the name is unique");
    const res = await client
      .from("groups")
      .select("name")
      .ilike("name", data.name);

    console.log(res);

    setNameChecking(() => false);

    // if a group already exists, then the name is not unique
    if (res.data && res.data?.length > 0) {
      console.log("group name exists");
      setError("name", {
        type: "value",
        message: "Group already exists",
      });
      return;
    }

    if (res.error) {
      console.log(res.error.message);
      show({
        header: "Error",
        message: "Something went wrong. Please try again",
        buttons: ['OK']
      }); 
      return;
    }

    // there's no group, that means the name is unique
    rt.push("/create/v2/group/2", "forward");
  };

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
                className={`custom my-2 text-lg font-poppins ${
                  getFieldState("name").isTouched ? "ion-touched" : ""
                } ${
                  errors.name ? "ion-touched ion-invalid border-red-500" : ""
                }`}
                placeholder="Name of your group"
                type="text"
                errorText={getFieldState("name").error?.message}
                {...register("name")}
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
                className={`custom my-2 text-lg font-poppins ${
                  getFieldState("name").isTouched ? "ion-touched" : ""
                } ${
                  errors.description ? "ion-touched ion-invalid border-red-500" : ""
                }`}
                errorText={getFieldState("description").error?.message}
                placeholder="Description of your group"
                {...register("description")}
              ></IonTextarea>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonCard>
          <IonCardContent>Anyone can see who's in the group.</IonCardContent>
        </IonCard>
        <IonCard className="mt-0">
          <IonCardContent>
            Chat links and posts of the group can only be seen by the members.
          </IonCardContent>
        </IonCard>
      </IonContent>
      <IonFooter>
        <IonToolbar className="p-2">
          <IonButton
            className="font-poppins font-bold"
            expand="block"
            onClick={handleSubmit(handleNext, handleError)}
          >
            {nameChecking ? <IonSpinner></IonSpinner> : <span>Next</span>}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}
