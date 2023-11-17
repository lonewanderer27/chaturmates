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
import S from "string";

// TODO: design StudentCard
type StudentCardProps = ComponentProps<typeof IonCard>;

export default function StudentCard(
  props: StudentCardProps & {
    logo: string;
    slug: string;
    studentName: string;
    studentType: string;
    studentDescription: string | null;
  }
) {
  const rt = useIonRouter();
  function handleView() {
    rt.push("/student/" + props.slug);
  }

  return (
    <SwiperSlide>
      <IonCard className="studentCard ion-padding m-2" onClick={handleView}>
        <IonRow>
          <IonCol size="2">
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
              <span className="studentName text-ellipsis  line-clamp-1">
                {props.studentName}
              </span>
              <p className="studentType">
                {S(props.studentType).capitalize().s}
              </p>
            </IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonText>
            <p className="line-clamp-3">{props.studentDescription}</p>
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
