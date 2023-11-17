import { useEffect, useState } from "react";
import { client } from "../../client";
import { ThreadType } from "../../types";

export default function useThread(thread_id: number) {
  const [thread, setThread] = useState<ThreadType>();

  function getThread() {
    // fetch the thread
    if (thread_id) {
      client
        .from("threads")
        .select("*")
        .eq("id", thread_id)
        .single()
        .then((response) => {
          setThread(response.data as ThreadType);
        });
    }
  }

  console.log("thread: ", thread);

  useEffect(() => {
    getThread();
  }, [thread_id])

  return {
    thread
  };
}
