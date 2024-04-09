import { useAtom } from "jotai";
import { threadsAtom } from "../../atoms/threads";
import { client } from "../../client";
import { ThreadType } from "../../types";
import { useEffect } from "react";

export default function useThreadsList() {
  const [threads, setThreads] = useAtom(threadsAtom);
  console.log("threads: ", threads);

  function getThreadsList() {
    // fetch all threads where the student is the sender
    // but only fetch the last message for each person
    client
      .from("threads")
      .select("*")
      .then((response) => {
        console.log("ThreadType: ", response);
        setThreads(response.data as ThreadType[]);
      });
  }

  useEffect(() => {
    getThreadsList();
  }, []);

  return {
    threads,
  };
}
