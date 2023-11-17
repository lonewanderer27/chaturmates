import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import useSelfStudent from "../../hooks/student/useSelfStudent";
import { useParams } from "react-router";
import useGetMessages from "../../hooks/threads/useGetMessages";
import useThread from "../../hooks/threads/useThread";
import ThreadMessage from "../../components/Messages/ThreadMessage";
import useSendMessage from "../../hooks/threads/useSendMessage";

export default function ThreadPage() {
  const { student } = useSelfStudent();
  const { thread_id } = useParams<{ thread_id: string }>();
  const { thread } = useThread(parseInt(thread_id));
  const { messages } = useGetMessages(parseInt(thread_id));

  const { sendMessage } = useSendMessage();

  function handleSendMessage(event: any) {
    if (event.key === "Enter") {
      sendMessage(student?.id!, parseInt(thread_id), event.target.value);
      event.target.value = "";
    }
  }

  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle>{thread?.title}</IonTitle>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle>{thread?.title}</IonTitle>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader> */}
        {messages &&
          messages.map((message) => (
            <ThreadMessage
              key={message.id}
              {...message}
              self={student?.id === message.student_id}
            />
          ))}
      </IonContent>
      <IonFooter className="ion-padding">
        <IonInput
          className="custom text-xl"
          onKeyPress={handleSendMessage}
        ></IonInput>
      </IonFooter>
    </IonPage>
  );
}
