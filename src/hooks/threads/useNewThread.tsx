import { useState } from "react";
import { client } from "../../client";
import useSelfStudent from "../student/useSelfStudent";

export default function useNewThread() {
  const { student } = useSelfStudent();
  const [res, setRes] = useState<any>();

  function handleNewThread(receiver_student_id: number) {
    // check if there's already a thread between the two students
    
  }

  return {
    handleNewThread,
    threadsRes: res
  };
}
