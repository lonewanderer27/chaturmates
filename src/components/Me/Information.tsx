import {IonItem, IonLabel, IonList, IonListHeader, IonSelect, IonSelectOption,} from "@ionic/react";
import {AcademicYearType, ProfileType, SchoolType, StudentType} from "../../types";
import S from "string";
import useUpdateInfo from "../../hooks/me/useUpdateInfo";

export default function StudentInformation(props: {
  student?: StudentType | null;
  school?: SchoolType | null;
  academic_year?: AcademicYearType | null;
  profile?: ProfileType | null;
}) {
  const {setEdit, edit, handleSubmit, handleSave, handleError, setValue, register} = useUpdateInfo();

  return (
    <IonList lines="none" className={'border-2 m-2 rounded-lg'}>
      <IonListHeader>
        <IonLabel className="text-lg">Information</IonLabel>
      </IonListHeader>
      <IonItem>
        <IonLabel>University</IonLabel>
        <IonLabel slot={"end"}>{props.school?.name}</IonLabel>
      </IonItem>
      <IonItem className={"my-[-10px]"}>
        <IonLabel>{props.school?.nickname} Email</IonLabel>
        <IonLabel slot={"end"}>{props.student?.school_email ?? ""}</IonLabel>
      </IonItem>
      <IonItem className={"mt-[-10px] mb-3"}>
        <IonLabel>Type</IonLabel>
        {!edit && <IonLabel slot={"end"}>{S(props.student?.type ?? "").capitalize().s}</IonLabel>}
        {edit && <IonSelect {...register("type")}>
            <IonSelectOption value={"regular"}>Regular</IonSelectOption>
            <IonSelectOption value={"irregular"}>Irregular</IonSelectOption>
        </IonSelect>}
      </IonItem>
    </IonList>
  );
}
