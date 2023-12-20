import { useState } from 'react';
import { IonCard, IonRow, IonText } from '@ionic/react';
import { ThreadMessageType } from '../../types';
import useSelfStudent from '../../hooks/student/useSelfStudent';

export default function ThreadMessage(props: ThreadMessageType & { self: boolean }) {
  const [isCardClicked, setIsCardClicked] = useState(false);
  const [timestamp, setTimestamp] = useState<string | null>(null);

  const handleCardClick = () => {
    setIsCardClicked(!isCardClicked);
    setTimestamp(new Date(props.created_at).toLocaleTimeString());
  };

  return (
    <IonRow className={`flex ${props.self ? 'justify-end' : 'justify-start'}`}>
      <IonCard
        className={`my-2 ion-padding ${props.self ? 'text-end' : 'text-start'}`}
        onClick={handleCardClick}
      >
        <IonText className="text-lg">{props.text}</IonText>
      </IonCard>
      {isCardClicked && timestamp && (
        <IonText className="timestamp" style={{ marginTop: '0px', marginLeft: '0px', marginRight: '10px'}}>
          {timestamp}
        </IonText>
      )}
    </IonRow>
  );
}