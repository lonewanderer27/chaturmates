import { client } from "../../client";

export default function useSendMessage() {

  function sendMessage(student_id: number, thread_id: number, text: string) {
    client
      .from("threads_messages")
      .insert({
        text: text,
        student_id: student_id,
        thread_id: thread_id,
      })
      .select("*")
      .single()
      .then((message) => {
        console.log(message);
      });
  }

  return {
    sendMessage,
  };
}
