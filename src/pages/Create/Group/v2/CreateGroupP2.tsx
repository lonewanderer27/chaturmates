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
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { GroupCreateInputs } from "../../../../types/group";
import { arrowBack } from "ionicons/icons";
import { useAtom } from "jotai";
import { newGroupAtom } from "../../../../atoms/groups";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { client } from "../../../../client";
import { useState } from "react";

export default function CreateGroupP2() {
  const rt = useIonRouter();
  const validationSchema = object().shape({
    avatar_url: string().optional().url("Must be a valid photo url"),
    cover_url: string().optional().url("Must be a valid photo url"),
    vanity_id: string().required().min(2),
  });
  const [checkingUrl, setCheckingUrl] = useState(() => false);
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
  } = useForm<GroupCreateInputs["step2"]>({
    resolver: yupResolver(validationSchema),
    defaultValues: newGroup.step2,
  });

  const handleBack = () => {
    console.log("handleBack");
    rt.push("/create/v2/group/1", "back");
  };

  const handleError: SubmitErrorHandler<GroupCreateInputs["step2"]> = (
    errors,
    event
  ) => {
    console.log("handleError");
    console.log(errors);
  };

  const handleNext: SubmitHandler<GroupCreateInputs["step2"]> = async (
    data
  ) => {
    setCheckingUrl(() => true);
    console.log("handleNext");
    console.log(data);

    // set avatar and cover url in the atom
    setNewGroup((prev) => {
      return {
        ...prev,
        step2: data,
      };
    });

    // check if the vanity url exists
    console.log("checking if the vanity url is unique");
    const res = await client
      .from("groups")
      .select("vanity_id")
      .ilike("vanity_id", data.vanity_id);

    console.log(res);

    setCheckingUrl(() => false);

    // if a group already exists, then the vanity url is not unique
    if (res.data!.length > 0) {
      console.log("vanity url is not unique");
      setError("vanity_id", {
        type: "value",
        message:
          "This ID is already taken. Please choose another one.",
      });

      return;
    }

    if (res.error) {
      console.log(res.error.message);
      return;
    }

    // there's no group, that means the vanity url is unique
    rt.push("/create/v2/group/3", "forward");
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
          <IonTitle>Customize {newGroup.step1.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Avatar
                </IonText>
              </IonLabel>
              <IonInput
                className={`custom my-2 text-lg font-poppins ${
                  getFieldState("avatar_url").isTouched ? "ion-touched" : ""
                } ${
                  errors.avatar_url
                    ? "ion-touched ion-invalid border-red-500"
                    : ""
                }`}
                placeholder={`Profile Photo of ${newGroup.step1.name}`}
                type="text"
                errorText={getFieldState("avatar_url").error?.message}
                {...register("avatar_url")}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Cover URL
                </IonText>
              </IonLabel>
              <IonInput
                className={`custom my-2 text-lg font-poppins ${
                  getFieldState("cover_url").isTouched ? "ion-touched" : ""
                } ${
                  errors.cover_url
                    ? "ion-touched ion-invalid border-red-500"
                    : ""
                }`}
                placeholder={`Cover Photo of ${newGroup.step1.name}`}
                errorText={getFieldState("cover_url").error?.message}
                {...register("cover_url")}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Vanity ID
                </IonText>
              </IonLabel>
              <IonInput
                className={`custom my-2 text-lg font-poppins ${
                  getFieldState("vanity_id").isTouched ? "ion-touched" : ""
                } ${
                  errors.vanity_id
                    ? "ion-touched ion-invalid border-red-500"
                    : ""
                }`}
                placeholder={`Vanity ID of ${newGroup.step1.name}`}
                errorText={getFieldState("vanity_id").error?.message}
                {...register("vanity_id")}
              ></IonInput>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonCard className="mt-0">
          <IonCardContent>This will serve as {newGroup.step1.name}'s Invite ID</IonCardContent>
        </IonCard>
      </IonContent>
      <IonFooter>
        <IonToolbar className="p-2">
          <IonButton
            className="font-poppins font-bold"
            expand="block"
            onClick={handleSubmit(handleNext, handleError)}
          >
            {checkingUrl ? <IonSpinner></IonSpinner> : <span>Next</span>}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}
