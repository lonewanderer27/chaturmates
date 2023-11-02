import { useEffect, useRef, useState } from "react";

export const useSignupModal = () => {
  const page = useRef<HTMLElement>();

  const modal = useRef<HTMLIonModalElement>(null);

  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >();
  const [showSignup, setShowSignup] = useState(false);

  const toggleShowSignup = () => {
    console.log("toggleShowSignup");

    if (showSignup) {
      modal.current?.dismiss();
    } else {
      modal.current?.present();
    }

    setShowSignup((show) => !show);
  };

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  return {
    page,
    modal,
    presentingElement,
    showSignup,
    toggleShowSignup,
  }
}