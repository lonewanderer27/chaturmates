import { useEffect, useState } from "react";
import { ThreadMessageType } from "../../types";
import { client } from "../../client";

export default function useGetLastMessageInThread(thread_id: number) {
  const [lastMessage, setLastMessage] = useState<ThreadMessageType>();

  function getLastMessageInThread() {
    // fetch the last message in the thread
    if (thread_id) {
      client
        .from("threads_messages")
        .select("*")
        .eq("thread_id", thread_id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single()
        .then((response) => {
          console.log("ThreadMessageType: ", response);
          setLastMessage(response.data as ThreadMessageType);
        });
    }
  }

  useEffect(() => {
    getLastMessageInThread();
  }, [thread_id]);

  return {
    lastMessage,
  };
}
