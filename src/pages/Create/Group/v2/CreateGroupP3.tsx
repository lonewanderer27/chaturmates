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
  IonNote,
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
import {
  Controller,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { GroupCreateInputs } from "../../../../types/group";
import { arrowBack } from "ionicons/icons";
import { useAtom } from "jotai";
import { newGroupAtom } from "../../../../atoms/groups";
import { object, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { client } from "../../../../client";
import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "../../../../services/course";
import { getAllColleges } from "../../../../services/college";
import { useMemo, useState } from "react";
import { CourseType } from "../../../../types";
import useSelfStudent from "../../../../hooks/student/useSelfStudent";
import { NEW_GROUP } from "../../../../constants/groups";

export default function CreateGroupP3() {
  const [show, dismiss] = useIonAlert();
  const { student } = useSelfStudent();
  const rt = useIonRouter();
  const validationSchema = object().shape({
    school: number().required("Must be a valid school"),
    college: number().required("Must be a valid college"),
    course: number().required("Must be a valid course"),
    semester: number().required("Must be a valid semester"),
    academic_year_id: number().required("Must be a valid academic year"),
  });
  const [creating, setCreating] = useState(() => false);
  const [newGroup, setNewGroup] = useAtom(newGroupAtom);

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    getFieldState,
    getValues,
    setValue,
    formState: { errors },
    control,
  } = useForm<GroupCreateInputs["step3"]>({
    resolver: yupResolver(validationSchema),
    defaultValues: newGroup.step3,
  });

  const collegesQry = useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      const res = (await getAllColleges()).data;
      return res;
    },
  });

  const coursesQry = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = (await getAllCourses()).data;
      return res;
    },
  });

  const handleBack = () => {
    console.log("handleBack");
    rt.push("/create/v2/group/2", "back");
  };
  const handleNext: SubmitHandler<GroupCreateInputs["step3"]> = async (
    data
  ) => {
    setCreating(() => true);

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
        semester: newGroup.step3.semester ?? 2,
        vanity_id: newGroup.step2.vanity_id,
      })
      .select("*")
      .single();

    if (!res.data) {
      console.log("error creating group");
      console.log(res.error);
      setCreating(() => false);
      return;
    }

    // add the current student to the group
    const res2 = await client
      .from("group_members")
      .insert({
        student_id: Number(student?.id),
        group_id: Number(res.data!.id),
        creator: true,
        is_admin: true,
        profile_id: student?.profile_id + ""
      })
      .select("*")

    if (!res2.data) {
      console.log("error creating group");
      console.log(res.error)
      show({
        header: "Error",
        message: "Something went wrong. Please try again",
        buttons: ['OK']
      }); 
      setCreating(() => false);
      return;
    }

    // clear the new group
    setNewGroup(NEW_GROUP);
    
    // redirect the user to their newly created group
    rt.push(`/group/${res.data?.vanity_id}`, "forward")
  };

  console.log(getValues());

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
                <Controller
                  render={({ field }) => (
                    <IonSelect
                      label="Select School"
                      labelPlacement="start"
                      fill="outline"
                      interfaceOptions={{
                        header: "Select school",
                      }}
                      className={`font-poppins`}
                      value={field.value}
                      onIonChange={(e) => setValue("school", e.detail.value)}
                    >
                      <IonSelectOption value={1}>Adamson University</IonSelectOption>
                    </IonSelect>
                  )}
                  control={control}
                  name="school"
                />
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
                <Controller
                  render={({ field }) => (
                    <IonSelect
                      label="Select College"
                      labelPlacement="start"
                      fill="outline"
                      interfaceOptions={{
                        header: "Select college ",
                      }}
                      className={`font-poppins`}
                      value={field.value}
                      onIonChange={(e) => setValue("college", e.detail.value)}
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
                  )}
                  control={control}
                  name="college"
                />
                {errors.college && (
                  <IonNote class="ion-invalid">
                    {getFieldState("college").error?.message}
                  </IonNote>
                )}
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
                <Controller
                  render={({ field }) => (
                    <IonSelect
                      label="Select Course"
                      labelPlacement="start"
                      fill="outline"
                      interfaceOptions={{
                        header: "Select the course",
                      }}
                      className={`font-poppins`}
                      value={field.value}
                      onIonChange={(e) => setValue("course", e.detail.value)}
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
                  )}
                  control={control}
                  name="course"
                />
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
                  label="Select Semester"
                  labelPlacement="start"
                  fill="outline"
                  interfaceOptions={{
                    header: "Select the semester",
                  }}
                  className={`font-poppins`}
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
                <Controller
                  render={({ field }) => (
                    <IonSelect
                      label="Select A.Y."
                      labelPlacement="start"
                      fill="outline"
                      interfaceOptions={{
                        header: "Select the academic year",
                      }}
                      value={field.value}
                      onIonChange={(e) =>
                        setValue("academic_year_id", e.detail.value)
                      }
                    >
                      <IonSelectOption value={1}>2023-2024</IonSelectOption>
                    </IonSelect>
                  )}
                  control={control}
                  name="academic_year_id"
                />
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
            {creating ? <IonSpinner></IonSpinner> : <span>Create Group</span>}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
}
