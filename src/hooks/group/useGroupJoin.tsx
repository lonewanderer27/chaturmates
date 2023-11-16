import { client } from "../../client";
import useSelfStudent from "../student/useSelfStudent";

export default function useGroupJoin(group_id: number, student_id: number) {
  const { student } = useSelfStudent();

  function handleGroupJoin() {
    console.log("handleGroupJoin");
    client
      .from("group_members")
      .insert({
        student_id: student!.id,
        group_id: group_id,
        creator: false,
        is_admin: false,
        approved: false,
        profile_id: student!.profile_id + "",
      })
      .then((response) => {
        console.log("response: ", response);
        if (response.status === 201) {
          console.log(response.data);
        }
        if (response.error) {
          console.log(response.error);
        }
      });
  }

  return {
    handleGroupJoin,
  };
}
