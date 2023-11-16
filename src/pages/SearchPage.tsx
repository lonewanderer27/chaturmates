import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import SearchHistory from "../components/Discover/Search/SearchHistory";
import StudentsResults from "../components/Discover/KlasmeytsResults";
import GroupsResults from "../components/Discover/GroupsResults";
import useSearchHistory from "../hooks/search/useSearchHistory";
import useSearch from "../hooks/search/useSearch";
import useStudentSearch from "../hooks/student/useStudentSearch";
import { useAtom } from "jotai";
import { searchQueryAtom } from "../atoms/search";
import useGroupSearch from "../hooks/group/useGroupSearch";

export default function SearchPage() {
  const rt = useIonRouter();
  function handleCancel() {
    rt.push("/discover", "back");
  }
  const [query, setQuery] = useAtom(searchQueryAtom);
  const { searchHistory } = useSearchHistory();
  const { handleStudentsSearch, studentsResults } = useStudentSearch();
  const { handleGroupSearch, groupsResults } = useGroupSearch();
  const { handleSearch } = useSearch();

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonSearchbar
              className="custom"
              onIonChange={(ev) => {
                setQuery(ev.detail.value!);
                handleSearch(ev.detail.value!);
                handleStudentsSearch(ev.detail.value!);
                handleGroupSearch(ev.detail.value!);
              }}
              debounce={100}
              placeholder='Example Letter "J"'
              mode="md"
              showCancelButton="always"
              onIonCancel={handleCancel}
              value={query}
            ></IonSearchbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <SearchHistory searchHistory={searchHistory} />
        <StudentsResults klasmeyts={studentsResults} />
        <GroupsResults groups={groupsResults} />
      </IonContent>
    </IonPage>
  );
}
