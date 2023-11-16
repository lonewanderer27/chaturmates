import { useEffect, useState } from "react";
import { StudentType } from "../../types";
import { client } from "../../client";
import { useAtom } from "jotai";
import { studentsResultsAtom } from "../../atoms/search";
import { useIonLoading } from "@ionic/react";

export default function useStudentSearch() {
  const [studentsResults, setStudentsResults] = useAtom(studentsResultsAtom);
  const [load, dismiss] = useIonLoading();

  async function getAll() {
    // load();
    const response = await client
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });
    // dismiss();
    console.log("studentsResults response:", response);
    setStudentsResults(response.data as StudentType[] ?? []);
  }

  useEffect(() => {
    getAll();
  }, []);

  const handleStudentsSearch = async (query: string) => {
    if (query.length === 0) {
      getAll();
    } else {
      // load();
      const response = await client
        .from("students")
        .select("*")
        .ilike("full_name", `%${query}%`)
        .order("created_at", { ascending: false });
      // dismiss();
      console.log("studentsResults response:", response);
      setStudentsResults(response.data as StudentType[] ?? []);
    }
  };

  return {
    handleStudentsSearch,
    studentsResults,
  };
}
