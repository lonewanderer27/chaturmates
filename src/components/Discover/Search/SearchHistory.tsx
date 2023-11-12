import { IonList } from "@ionic/react";
import SearchHistoryItem from "./SearchHistoryItem";

export default function SearchHistory() {
  return (
    <IonList>
      <SearchHistoryItem />
      <SearchHistoryItem title="Software Engineering the best in the world" />
    </IonList>
  );
}
