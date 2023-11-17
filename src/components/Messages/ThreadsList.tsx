import { IonList } from "@ionic/react";
import { ThreadType } from "../../types";
import ThreadItem from "./ThreadItem";

export default function ThreadsList(props: {
  threads: ThreadType[];
}) {
  return (
    <IonList>
      {props.threads && props.threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
      ))}
    </IonList>
  )
}
