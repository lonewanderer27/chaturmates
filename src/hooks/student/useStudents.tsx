import { useAtom } from "jotai";
import { studentsAtom } from "../../atoms/students";
import { useEffect } from "react";
import { client } from "../../client";
import { StudentType } from "../../types";

export default function useStudents() {
  const [students, setStudents] = useAtom(studentsAtom);

  async function getAll() {
    const response = await client.from("students").select("*");
    console.log("students response:", response);
    setStudents(response.data as StudentType[]);
  }

  useEffect(() => {
    getAll();
  }, []);

  return {
    students
  };
}
