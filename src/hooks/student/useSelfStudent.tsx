import { StudentType, ProfileType } from "../../types";
import { useEffect, useState } from "react";
import useSession from "../auth/useSession";
import { client } from "../../client";
import useProfile from "../profile/useProfile";

export function useFindStudent(student_id: string) {
  const [student, setStudent] = useState<StudentType>();

  useEffect(() => {
    (async () => {
        const response = await client
            .from("students")
            .select("*")
            .eq("id", student_id)
            .single();
        console.log("useStudent response", response)
        setStudent(response.data as StudentType);
    })();
  }, [student_id]);

  return { student }
}

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
        console.log("useStudent response", response)
        setStudent(response.data as StudentType);
      }
    })();
  }, [session, profile]);

  return {
    student,
  };
}
