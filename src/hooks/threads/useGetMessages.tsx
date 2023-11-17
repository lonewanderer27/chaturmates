import { useEffect, useState } from "react";
import { ThreadMessageType } from "../../types";
import { client } from "../../client";

export default function useGetMessages(thread_id: number) {
  const [messages, setMessages] = useState<ThreadMessageType[]>([]);

  function getMessages() {
    // fetch all messages in the thread
    if (thread_id) {
      client
        .from("threads_messages")
        .select("*")
        .eq("thread_id", thread_id)
        .then((response) => {
          setMessages(response.data as ThreadMessageType[]);
        });
    }
  }

  useEffect(() => {
    // fetch messages in the thread
    getMessages();

    // subscribe to changes in the thread
    const channel = client
      .channel("thread:" + thread_id)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "threads_messages",
        },
        (payload) => {
          console.log("payload: ", payload);
          // payload will contain the new data
          const newp = payload.new as ThreadMessageType;

          // compare if the new message's thread_id is the same as the thread_id
          if (newp.thread_id === thread_id) {
            // add the new message to the thread
            setMessages((thread) => [...thread, newp]);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [thread_id]);

  return {
    messages,
  };
}
