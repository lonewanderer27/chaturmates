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
import { searchCategoryAtom, searchQueryAtom } from "../atoms/search";
import useGroupSearch from "../hooks/group/useGroupSearch";
import SearchCategory from "../components/Discover/Search/SearchCategory";
import { SEARCH_CATEGORY } from "../enums/search";

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

  const [activePage, setActivePage] = useAtom(searchCategoryAtom);

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonSearchbar
              className="custom px-0 mx-0 font-poppins font-semibold"
              onIonChange={(ev) => {
                setQuery(ev.detail.value!);
                handleSearch(ev.detail.value!);
                handleStudentsSearch(ev.detail.value!);
                handleGroupSearch(ev.detail.value!);
              }}
              debounce={750}
              onIonInput={(ev) => {
                setQuery(ev.detail.value!);
                handleSearch(ev.detail.value!);
                handleStudentsSearch(ev.detail.value!);
                handleGroupSearch(ev.detail.value!);
              }}
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
        <SearchCategory value={activePage} setActivePage={setActivePage} />
        <SearchHistory searchHistory={searchHistory} />
        {activePage === SEARCH_CATEGORY.ALL ||
          activePage === SEARCH_CATEGORY.KLASMEYTS ? (
            <StudentsResults klasmeyts={studentsResults} />
          ) : null}
        {activePage === SEARCH_CATEGORY.ALL ||
          activePage === SEARCH_CATEGORY.GROUPS ? (
            <GroupsResults groups={groupsResults} />
          ) : null}
      </IonContent>
    </IonPage>
  );
}
