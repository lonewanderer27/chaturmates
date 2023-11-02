import { useHistory } from "react-router";
import { showTabBar } from "../../utils/auth";

export const useLogin = () => {
  const hst = useHistory();

  const handleLogin = () => {
    // TODO: implement logic

    // show tabs
    showTabBar();

    // redirect user to home page
    hst.push("/discover");
  }

  return {
    handleLogin,
  }
}