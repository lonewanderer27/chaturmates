import { useIonRouter } from "@ionic/react";
import useSession from "../auth/useSession";
import useSelfStudent from "../student/useSelfStudent";
import { client } from "../../client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateGroupInputs } from "../../types/group";
import { GroupType } from "../../types";

export default function useCreateGroup() {
  const rt = useIonRouter();
  const { session } = useSession();
  const { student } = useSelfStudent();
  const [success, setSuccess] = useState<boolean | undefined>();
  const [group, setGroup] = useState<GroupType>();
  const [response, setResponse] = useState<any>();

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    getFieldState,
    getValues,
  } = useForm<CreateGroupInputs>({
    defaultValues: {
      school: 1,
      semester: 2,
      course: 2,
      academic_year_id: 1,
    },
  });

  const handleCreate: SubmitHandler<CreateGroupInputs> = (data) => {
    // create group
    client
      .from("groups")
      .insert(data)
      .select("*")
      .then((response) => {
        console.log("response: ", response);
        if (response.status === 201) {
          // add student to group
          client
            .from("group_members")
            .insert({
              student_id: Number(student?.id),
              group_id: Number(response.data![0].id),
              creator: true,
              is_admin: true,
              profile_id: student?.profile_id + "",
            })
            .select("*")
            .then((response) => {
              console.log("response: ", response);
              if (response.status === 201) {
                console.log(response.data);
                setSuccess(true);
                rt.push("/group/" + getValues("vanity_id"), "forward");
              }
              if (response.error) {
                console.log(response.error);
                setSuccess(false);
              }
            });
        }
        if (response.error) {
          console.log(response.error);
          setSuccess(false);
        }
      });
  };

  return {
    handleCreate,
    success,
    register,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    getFieldState,
    getValues,
  };
}
