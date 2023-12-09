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
import {
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  Controller,
} from "react-hook-form";
import { CreateGroupInputs, GroupCreateInputs } from "../../../../types/group";
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
    vanity_url: string().required("Must be a unique group name"),
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
  });

  const handleBack = () => {
    console.log("handleBack");
    rt.goBack();
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
      .select("vanity_url")
      .eq("vanity_url", data.vanity_url);

    console.log(res);

    setCheckingUrl(() => false);

    // if a group already exists, then the vanity url is not unique
    if (res.data!.length > 0) {
      console.log("vanity url is not unique");
      setError("vanity_url", {
        type: "value",
        message:
          "This unique name is already taken. Please choose another one.",
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
          <IonTitle>Customize your Group</IonTitle>
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
                placeholder="Profile photo of your group"
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
                placeholder="Cover photo of your group"
                errorText={getFieldState("cover_url").error?.message}
                {...register("cover_url")}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Unique URL
                </IonText>
              </IonLabel>
              <IonInput
                className={`custom my-2 text-lg font-poppins ${
                  getFieldState("vanity_url").isTouched ? "ion-touched" : ""
                } ${
                  errors.vanity_url
                    ? "ion-touched ion-invalid border-red-500"
                    : ""
                }`}
                placeholder="Unique name of your group"
                errorText={getFieldState("vanity_url").error?.message}
                {...register("vanity_url")}
              ></IonInput>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonCard className="mt-0">
          <IonCardContent>This will serve as your invite url</IonCardContent>
        </IonCard>
      </IonContent>
      <IonFooter>
        <IonToolbar className="p-2">
          <IonButton
            className="font-poppins font-bold"
            expand="block"
            onClick={handleSubmit(handleNext)}
          >
            {checkingUrl ? <IonSpinner></IonSpinner> : <span>Next</span>}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}
