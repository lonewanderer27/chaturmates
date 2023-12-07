import { useAtom } from "jotai";
import { studentAtom } from "../../atoms/students";
import { useEffect } from "react";
import { client } from "../../client";
import { StudentType } from "../../types";
import { useQuery } from "@tanstack/react-query";
import StudentHTTPServices from "../../services/student.service";

export function useStudentB(id: string) {
  let student: StudentType;
  const query = useQuery({
    queryKey: ["student", id],
    queryFn: async () => {
      return (await StudentHTTPServices.get(id)).data.data;
    },
  });
}

export default function useStudent(student_id: string) {
  const [student, setStudent] = useAtom(studentAtom);

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
