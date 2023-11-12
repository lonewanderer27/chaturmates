import {
  IonAvatar,
  IonCard,
  IonCol,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { ComponentProps } from "react";
import { SwiperSlide } from "swiper/react";
import "./StudentCard.css";

// TODO: design StudentCard
type StudentCardProps = ComponentProps<typeof IonCard>;

export default function StudentCard(
  props: StudentCardProps & {
    studentName: string;
    studentType: string;
    studentDescription: string;
  }
) {
  return (
    <SwiperSlide>
      <IonCard className="studentCard ion-padding ion-no-margin">
        <IonRow>
          <IonCol size="3">
            <IonAvatar>
              <IonIcon
                className="studentIcon"
                src={personCircleOutline}
              ></IonIcon>
            </IonAvatar>
          </IonCol>
          <IonCol style={{ display: "flex" }}>
            <IonText>
              <span>{props.studentName}</span>
              <br />
              <span>{props.studentType}</span>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonText>
            <p>{props.studentDescription}</p>
          </IonText>
        </IonRow>
      </IonCard>
    </SwiperSlide>
  );
}

StudentCard.defaultProps = {
  studentName: "Johnna Doe",
  studentType: "Irregular",
  studentDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};
