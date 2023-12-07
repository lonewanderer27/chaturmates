import { StudentType, ProfileType } from "../../types";
import { useEffect, useState } from "react";
import useSession from "../auth/useSession";
import { client } from "../../client";
import useProfile from "../profile/useProfile";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import StudentHTTPServices from "../../services/student.service";
import { useIonLoading } from "@ionic/react";

export function useFindStudent(student_id: string) {
  const [student, setStudent] = useState<StudentType>();

  useEffect(() => {
    (async () => {
      const response = await client
        .from("students")
        .select("*")
        .eq("id", student_id)
        .single();
      console.log("useStudent response", response);
      setStudent(response.data as StudentType);
    })();
  }, [student_id]);

  return { student };
}

// export function useCurrentStudent() {
//   // access session
//   const { session } = useSession();

//   const query = useQuery({
//     queryKey: ["current_student"],
//     queryFn: async () => {
//       console.log("useCurrentStudent queryFn");
//       const res = (await StudentHTTPServices.get(session!.user.id)).data
//         .data
//       console.log("useCurrentStudent queryFn res", res);
//       return res;
//     },
//     enabled: !!session,
//   });

//   return query;
// }

export default function useSelfStudent() {
  const { session } = useSession();
  const { profile } = useProfile();
  const [student, setStudent] = useState<StudentType>();

  useEffect(() => {
    (async () => {
      if (session && profile) {
        const response = await client
          .from("students")
          .select("*")
          .eq("profile_id", profile!.id)
          .single();
        console.log("useStudent response", response);
        setStudent(response.data as StudentType);
      }
    })();
  }, [session, profile]);

  return {
    student,
  };
}
