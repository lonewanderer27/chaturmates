import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { showCreateGroupModalAtom } from "../../atoms/groups";

export default function useCreateGroupModal() {
  const page = useRef<HTMLElement>();
  const modal = useRef<HTMLIonModalElement>(null);

  const [presentingElement, setPresentingElement] = useState<
    HTMLElement | undefined
  >();
  const [showCreateGroup, setShowCreateGroup] = useAtom(
    showCreateGroupModalAtom
  );

  console.log("showCreateGroup", showCreateGroup)

  const toggleShowCreateGroup = () => {
    console.log("toggleShowCreateGroup");

    if (showCreateGroup) {
      modal.current?.dismiss();
      console.log("dismiss")
    } else {
      modal.current?.present();
      console.log("dismiss")
    }

    setShowCreateGroup((show) => !show);
  };

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  return {
    page,
    modal,
    presentingElement,
    showCreateGroup,
    toggleShowCreateGroup,
    setShowCreateGroup
  };
}
