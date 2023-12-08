import { StudentType, ProfileType } from "../../types";
import { useEffect, useState } from "react";
import useSession from "../auth/useSession";
import { client } from "../../client";
import useProfile from "../profile/useProfile";
import { useQuery } from "@tanstack/react-query";
import { getStudentById } from "../../services/student";

export function useFindStudent(student_id: string) {
  const query = useQuery({
    queryKey: ["student lite", student_id],
    queryFn: async () => {
      const res = (await client.from("students").select("*").eq("id", student_id).single()).data;
      return res;
    },
  })
  // const [student, setStudent] = useState<StudentType>();

  // useEffect(() => {
  //   (async () => {
  //     const response = await client
  //       .from("students")
  //       .select("*")
  //       .eq("id", student_id)
  //       .single();
  //     console.log("useStudent response", response);
  //     setStudent(response.data as StudentType);
  //   })();
  // }, [student_id]);

  return { student: query.data? query.data as StudentType : null };
}

export default function useSelfStudent() {
  const { session } = useSession();
  const { profile } = useProfile();

  const query = useQuery({
    queryKey: ["student, profile id:", profile?.id],
    queryFn: async () => {
      const res = (
        await client
          .from("students")
          .select("*")
          .eq("profile_id", profile!.id)
          .single()
      ).data;
      return res;
    },
    enabled: !!profile && !!session,
  });

  const query2 = useQuery({
    queryKey: ["student", query.data?.id],
    queryFn: async () => {
      const res = (await getStudentById(query.data?.id + "")).data;
      return res;
    },
    enabled: !!query.data?.id,
  });

  return {
    profile: profile,
    student: query.data ?? null,
    groups: query2.data?.groups ?? null,
    followers: query2.data?.followers ?? null,
    following: query2.data?.following ?? null,
  };
}
