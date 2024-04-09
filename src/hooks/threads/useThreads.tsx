import { useAtom } from "jotai";
import { client } from "../../client";
import useSelfStudent from "../student/useSelfStudent";
import { threadsAtom } from "../../atoms/threads";
import { ThreadType } from "../../types";
import { useEffect } from "react";

export default function useThreads() {
  const { student } = useSelfStudent();
  const [threads, setThreads] = useAtom(threadsAtom);

  function getThreads() {
    // fetch all threads where the student is the sender
    if (student) {
      client
        .from("threads")
        .select("*")
        .then((response) => {
          console.log("ThreadType: ", response);
          setThreads((response.data as ThreadType[]) ?? []);
        });
    }
  }

  useEffect(() => {
    getThreads();
  }, [student]);

  return {
    getThreads,
    threads,
  };
}
