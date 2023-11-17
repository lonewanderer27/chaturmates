import {
  IonAvatar,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { ThreadType } from "../../types";
import { useFindStudent } from "../../hooks/student/useSelfStudent";
import { personCircleOutline } from "ionicons/icons";
import "./ThreadItem.css";
import useGetLastMessageInThread from "../../hooks/threads/useGetLastMessageInThread";

export default function ThreadItem(props: ThreadType) {
  const { lastMessage } = useGetLastMessageInThread(props.id);
  const { student } = useFindStudent(lastMessage?.student_id + "");
  const rt = useIonRouter();

  function handleClick() {
    rt.push("/threads/" + props.id);
  }

  console.log("ThreadItem: ", props, lastMessage, student);

  return (
    <IonItem onClick={handleClick}>
      {student?.avatar_url ? (
        <>
          <IonAvatar slot="start">
            <img src={student?.avatar_url} />
          </IonAvatar>
        </>
      ) : (
        <>
          <IonIcon
            className="receiverIcon"
            slot="start"
            size="large"
            icon={personCircleOutline}
          ></IonIcon>
        </>
      )}
      <IonLabel>
        <h2 className="font-bold">{props.title}</h2>
        <p className="text-lg">{lastMessage?.text}</p>
      </IonLabel>
    </IonItem>
  );
}
