import {
  IonAvatar,
  IonCol,
  IonIcon,
  IonItem,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { StudentType } from "../../../types";
import { mail, personCircleOutline } from "ionicons/icons";
import S from "string";
import "./StudentItem.css";
import ItemListButton from "../../ItemListButton";
import { useMemo } from "react";

export default function StudentItem(props: {
  student: StudentType;
  icon?: string;
  showType?: boolean;
  showBtn?: boolean;
  buttonLabel?: string;
  buttonIcon?: string;
}) {
  const rt = useIonRouter();
  const isValidUrl = useMemo(() => {
    try {
      new URL(props.student.avatar_url + "");
      return true;
    } catch (_) {
      return false;
    }
  }, [props.student.avatar_url]);

  function handleClick() {
    rt.push("/student/" + props.student.id);
  }

  function handleMe() {
    rt.push("/me");
  }

  return (
    <IonItem lines="none" onClick={handleClick} className="cursor-pointer">
      {props?.student.avatar_url && isValidUrl ? (
        <IonAvatar slot="start" className="mr-3 studentItemLogo">
          <img className="studentItemLogo" src={props!.student.avatar_url} />
        </IonAvatar>
      ) : (
        <IonIcon
          className="studentItemIcon mr-1 ml-[-5px]"
          slot="start"
          icon={props.icon}
        ></IonIcon>
      )}
      <IonRow className="ion-align-items-center ml-[-5px]">
        <IonCol>
          <IonText className="studentItemName truncate font-poppins font-semibold">
            {props?.student.full_name}
          </IonText>
          {props.showType && (
            <>
              <br />
              <IonText className="studentType text-sm">
                {S(props?.student.type + "").capitalize().s}
              </IonText>
            </>
          )}
        </IonCol>
      </IonRow>
      {props.showBtn && <ItemListButton buttonIcon={props.buttonIcon} />}
    </IonItem>
  );
}

StudentItem.defaultProps = {
  icon: personCircleOutline,
  buttonLabel: "Message",
  buttonIcon: mail,
  showBtn: true,
  showType: true,
};
