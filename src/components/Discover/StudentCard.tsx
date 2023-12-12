import {
  IonAvatar,
  IonCard,
  IonCol,
  IonIcon,
  IonImg,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { SwiperSlide } from "swiper/react";
import "./StudentCard.css";
import S from "string";
import { StudentType } from "../../types";

export default function StudentCard(props: {
  student: StudentType;
  icon?: string;
}) {
  const rt = useIonRouter();
  function handleView() {
    rt.push("/student/" + props.student.id, "forward");
  }

  return (
    <SwiperSlide>
      <IonCard
        className="studentCard ion-padding m-2 font-poppins"
        onClick={handleView}
      >
        <IonRow>
          <IonCol size="2">
            {props.student.avatar_url ? (
              <IonAvatar>
                <IonImg
                  className="rounded-full studentAvatar ml-[-5px]"
                  src={props!.student.avatar_url}
                />
              </IonAvatar>
            ) : (
              <IonIcon
                className="studentIcon ml-[-10px]"
                src={props.icon}
              ></IonIcon>
            )}
          </IonCol>
          <IonCol className="flex ml-[10px]">
            <IonText className="justify-content-center">
              <p className="studentName text-ellipsis line-clamp-1">
                {props.student.full_name}
              </p>
              <p className="studentType font-light mt-[-5px]">
                {S(props.student.type).capitalize().s}
              </p>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonText>
            <p className="line-clamp-3 font-medium">
              {props.student.description}
            </p>
          </IonText>
        </IonRow>
      </IonCard>
    </SwiperSlide>
  );
}

StudentCard.defaultProps = {
  icon: personCircleOutline,
};
