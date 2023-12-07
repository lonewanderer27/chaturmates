import { RouteProps } from "react-router";
import useSession from "../../hooks/auth/useSession";
import { Redirect } from "react-router";
import { IonLoading, useIonRouter } from "@ionic/react";
import { hideTabBar, showTabBar } from "../../utils/auth";

const AuthWrapper = (props: RouteProps): JSX.Element => {
  const { session } = useSession();

  console.info(session);

  if (session !== undefined && session !== null) {
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
