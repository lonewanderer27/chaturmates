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
import { object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { client } from "../../../../client";
import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "../../../../services/course";
import { getAllColleges } from "../../../../services/college";

export default function CreateGroupP3() {
  const rt = useIonRouter();
  const validationSchema = object().shape({
    school: number().required("Must be a valid school"),
    college: number().required("Must be a valid college"),
    course: number().required("Must be a valid course"),
    semester: number().required("Must be a valid semester"),
    academic_year_id: number().required("Must be a valid academic year"),
  });
  const [newGroup, setNewGroup] = useAtom(newGroupAtom);

  const coursesQry = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = (await getAllCourses()).data;
      return res;
    },
  });

  const collegesQry = useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const res = (await getAllColleges()).data;
      return res;
    },
  });

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
  } = useForm<GroupCreateInputs["step3"]>({
    resolver: yupResolver(validationSchema),
    defaultValues: newGroup.step3,
  });

  const handleBack = () => {
    console.log("handleBack");
    rt.goBack();
  };
  const handleNext: SubmitHandler<GroupCreateInputs["step3"]> = async (
    data
  ) => {
    clearErrors();

    console.log("handleNext");
    console.log(data);

    // set group name and description in the atom
    setNewGroup((prev) => {
      return {
        ...prev,
        step3: data,
      };
    });

    // create group
    const res = await client
      .from("groups")
      .insert({
        academic_year_id: newGroup.step3.academic_year_id ?? 1,
        avatar_url: newGroup.step2.avatar_url ?? null,
        course: newGroup.step3.course ?? 2,
        cover_url: newGroup.step2.cover_url,
        description: newGroup.step1.description,
        name: newGroup.step1.name,
        school: newGroup.step3.school ?? 1,
        semester: newGroup.step3.semester,
        vanity_url: newGroup.step2.vanity_url,
      })
      .select("*")
      .single();

    if (!res.data) {
      console.log("error creating group");
      console.log(res.error);
    }
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
          <IonTitle>Additional Information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  School
                </IonText>
              </IonLabel>
              <IonItem className="my-2">
                <IonSelect
                  value={1}
                  fill="outline"
                  interfaceOptions={{
                    header: "Select the school",
                  }}
                >
                  <IonSelectOption value={1}>
                    Adamson University
                  </IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  College
                </IonText>
              </IonLabel>
              <IonItem className="my-2">
                <IonSelect
                  fill="outline"
                  interfaceOptions={{
                    header: "Select college ",
                  }}
                  {...register("college")}
                >
                  {collegesQry.data?.colleges.map((college) => (
                    <IonSelectOption
                      key={"college:" + college.id}
                      value={college.id}
                    >
                      {college.title}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Course
                </IonText>
              </IonLabel>
              <IonItem className="my-2">
                <IonSelect
                  fill="outline"
                  interfaceOptions={{
                    header: "Select the course",
                  }}
                  {...register("course")}
                >
                  {coursesQry.data?.courses.map((course) => (
                    <IonSelectOption
                      key={"course:" + course.id}
                      value={course.id}
                    >
                      {course.title}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Semester
                </IonText>
              </IonLabel>
              <IonItem className="my-2">
                <IonSelect
                  fill="outline"
                  interfaceOptions={{
                    header: "Select the semester",
                  }}
                  {...register("semester")}
                >
                  <IonSelectOption value={1}>First Semester</IonSelectOption>
                  <IonSelectOption value={2}>Second Semester</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonLabel>
                <IonText className="font-poppins font-semibold text-lg">
                  Academic Year
                </IonText>
              </IonLabel>
              <IonItem className="my-2">
                <IonSelect
                  value={1}
                  fill="outline"
                  interfaceOptions={{
                    header: "Select the academic year",
                  }}
                  {...register("academic_year_id")}
                >
                  <IonSelectOption value={1}>2023-2024</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonFooter>
        <IonToolbar className="p-2">
          <IonButton
            className="font-poppins font-bold"
            expand="block"
            onClick={handleSubmit(handleNext)}
          >
            <span>Create Group</span>
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}
