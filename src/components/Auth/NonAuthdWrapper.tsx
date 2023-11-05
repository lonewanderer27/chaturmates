import { RouteProps } from "react-router";
import useSession from "../../hooks/auth/useSession";
import { hideTabBar, showTabBar } from "../../utils/auth";

const NonAuthdWrapper = (props: RouteProps): JSX.Element => {
  const { session } = useSession();
  console.info(session);

  if (session !== undefined && session !== null) {
    // we're authenticated, so we can show the tabs
    showTabBar();
  }

  if (session === null) {
    hideTabBar();
  }

  return props.children as unknown as JSX.Element;
}

export default NonAuthdWrapper;