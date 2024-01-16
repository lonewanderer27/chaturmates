import { IonContent, IonPage, useIonRouter } from "@ionic/react";
import { ProfileType, StudentType } from "../../types";
import { Redirect, RouteProps } from "react-router";
import { useEffect, useState } from "react";

import TitleBar from "../TitleBar";
import { client } from "../../client";
import { hideTabBar } from "../../utils/auth";
import useSelfStudent from "../../hooks/student/useSelfStudent";
import useSession from "../../hooks/auth/useSession";

export default function VerificationWrapper(props: RouteProps): JSX.Element {
  const rt = useIonRouter();
  const { student } = useSelfStudent();

  console.log("verification wrapper props", props);

  useEffect(() => {
    // hide tab bar if we're on /verify
    if (rt.routeInfo.pathname === "/verify") {
      hideTabBar();
    }
  }, [rt.routeInfo.pathname]);

  // if the student is not verified, redirect to the verification page
  if (student?.verified === false  || !student?.school_email) {
    return <Redirect to="/verify" />
  }

  return props.children as unknown as JSX.Element;
}
