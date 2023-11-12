import { IonCol, IonGrid, IonText } from "@ionic/react";
import StudentCard from "./StudentCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";

export default function StudentsGrid() {
  return (
    <IonGrid className="ion-padding-vertical">
      <Swiper modules={[Scrollbar]} scrollbar={true}>
        <StudentCard />
        <StudentCard />
        <StudentCard />
      </Swiper>
    </IonGrid>
  );
}
