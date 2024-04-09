import { IonLoading, useIonRouter } from "@ionic/react";
import { hideTabBar, showTabBar } from "../../utils/auth";

import { Redirect } from "react-router";
import { RouteProps } from "react-router";
import useProfile from "../../hooks/profile/useProfile";
import useSession from "../../hooks/auth/useSession";

const AuthWrapper = (props: RouteProps): JSX.Element => {
  const { session } = useSession();
  const { profile } = useProfile();

  console.info(session);

  if (session !== undefined && session !== null) {
    if (profile?.students[0].verified === false) {
      hideTabBar();
      return <Redirect to="/verify" />;
    }

    // we're authenticated, so we can show the tabs
    showTabBar();
    return props.children as unknown as JSX.Element;
  }

  if (session === null) {
    hideTabBar();
    return <Redirect to="/login" />;
  }

  return <></>;
};

export default AuthWrapper;
