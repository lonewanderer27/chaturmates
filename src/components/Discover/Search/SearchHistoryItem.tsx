import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { closeCircleOutline, timeOutline } from "ionicons/icons";
import { ComponentProps } from "react";
import { SearchHistoryType } from "../../../types";
import useSearchHistory from "../../../hooks/search/useSearchHistory";
import useSearch from "../../../hooks/search/useSearch";
import useGroupSearch from "../../../hooks/group/useGroupSearch";
import useStudentSearch from "../../../hooks/student/useStudentSearch";

type IonItemProps = ComponentProps<typeof IonItem>;

export default function SearchHistoryItem(
  props: IonItemProps & {
    historyId: number;
    icon: string;
    query: string;
    closeIcon: string;
    lines: string;
  }
) {

  const { handleGroupSearch } = useGroupSearch();
  const { handleStudentsSearch } = useStudentSearch();
  const { handleHide } = useSearchHistory();
  const { handleSearch } = useSearch();

  return (
    <IonItem
      {...props}
      className="cursor-pointer"
      onClick={() => {
        handleGroupSearch(props.title ?? "")
        handleStudentsSearch(props.title ?? "") 
        handleSearch(props.title ?? "")
      }}
    >
      <IonIcon icon={timeOutline} slot="start"></IonIcon>
      <IonLabel>{props.title}</IonLabel>
      <IonIcon
        onClick={() => handleHide(props.historyId)}
        icon={props.closeIcon}
      ></IonIcon>
    </IonItem>
  );
}

SearchHistoryItem.defaultProps = {
  id: 0,
  icon: timeOutline,
  query: "Johnna Doe",
  closeIcon: closeCircleOutline,
  lines: "none",
};
