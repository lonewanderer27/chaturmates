import "./Messages.css";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonText,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";

import RecentContacts from "../components/Messages/RecentContacts";
import ThreadsList from "../components/Messages/ThreadsList";
import useStudents from "../hooks/student/useStudents";
import useThreads from "../hooks/threads/useThreads";

function Threads() {
  const { students } = useStudents();
  const { threads } = useThreads();

  useIonViewWillEnter(() => {
    document.title = "Threads | Klasmeyt";
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonText slot="start" className="pageTitle">
              Messages
            </IonText>
          </IonToolbar>
        </IonHeader>
        <p className="pl-1">Start a conversation</p>
        <RecentContacts students={students} />
        <IonSearchbar
          className="custom"
          debounce={100}
          placeholder="Search conversations"
          mode="md"
          showCancelButton="never"
        />
        <ThreadsList threads={threads} />
      </IonContent>
    </IonPage>
  );
}

export default Threads;
