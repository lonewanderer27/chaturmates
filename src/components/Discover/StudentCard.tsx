import {
  IonAvatar,
  IonCard,
  IonCol,
  IonIcon,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { ComponentProps } from "react";
import { SwiperSlide } from "swiper/react";
import "./StudentCard.css";

// TODO: design StudentCard
type StudentCardProps = ComponentProps<typeof IonCard>;

export default function StudentCard(
  props: StudentCardProps & {
    logo: string;
    slug: string;
    studentName: string;
    studentType: string;
    studentDescription: string;
  }
) {
  const rt = useIonRouter();
  function handleView() {
    rt.push("/student/" + props.slug);
  }

  return (
    <SwiperSlide>
      <IonCard
        className="studentCard ion-padding ion-no-margin"
        onClick={handleView}
      >
        <IonRow>
          <IonCol size="3">
            <IonAvatar>
              {props.logo ? (
                <img src={props.logo} />
              ) : (
                <IonIcon
                  className="studentIcon"
                  src={personCircleOutline}
                ></IonIcon>
              )}
            </IonAvatar>
          </IonCol>
          <IonCol style={{ display: "flex" }}>
            <IonText>
              <span className="studentName">{props.studentName}</span>
              <br />
              <span className="studentType">{props.studentType}</span>
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
  logo: "johnna_doe.png",
  slug: "johnna-doe",
  studentName: "Johnna Doe",
  studentType: "Irregular",
  studentDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};
