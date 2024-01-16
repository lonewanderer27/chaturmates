import {useEffect, useRef, useState} from "react";
import {useAtom} from "jotai";
import {changePassAtom} from "../../atoms/me";

export default function useChangePassModal() {
  const page = useRef<HTMLElement>();
  const modal = useRef<HTMLIonModalElement>(null);

  const [presentingElement, setPresentingElement] = useState<HTMLElement | undefined>();
  const [showChangePass, setShowChangePass] = useAtom(changePassAtom);

  const toggleShowChangePass = () => {
    console.log("toggleShowChangePass");
    if (showChangePass) {
      modal.current?.dismiss();
    } else {
      modal.current?.present();
    }
    setShowChangePass((show) => !show);
  };

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  return {
    page,
    modal,
    presentingElement,
    showChangePass,
    toggleShowChangePass,
  }
}