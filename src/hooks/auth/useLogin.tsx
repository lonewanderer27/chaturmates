import { showTabBar } from "../../utils/auth";
import useSession from "./useSession";
import { useEffect, useState } from "react";
import { useIonAlert, useIonRouter } from "@ionic/react";
import { client } from "../../client";
import { AuthTokenResponse } from "@supabase/supabase-js";
import { SubmitHandler, useForm } from "react-hook-form";

export const useLogin = () => {
  const hst = useIonRouter();
  const { session } = useSession();
  const [res, setRes] = useState<AuthTokenResponse>();

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    getFieldState,
  } = useForm<LoginFormInputs>();

  const homePage = () => {
    hst.push("/discover");
  };

  const [show] = useIonAlert();

  const handleLogin: SubmitHandler<LoginFormInputs> = (data) => {
    // log that the user is attempting to signin
    console.log("attempting to signin");
    console.log(data);

    // clear the errors
    clearErrors();

    // attempt to signin user with password
    client.auth
      .signInWithPassword({
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        if (response.data.session) {
          setRes(response);

          // redirect user to home page
          homePage();
        } else {
          // notify the user that there has been an error
          show({
            header: "Alert",
            message: "Invalid email or password. Please try again.",
            buttons: ["OK"],
          });

          // set errors to fields
          setError("email", {
            type: "custom",
            message: "Invalid email or password",
          });
          setError("password", {
            type: "custom",
            message: "Invalid email or password",
          });
        }
      }).catch((error) => {
        console.error(error);
      })
  };

  useEffect(() => {
    if (session) {
      homePage();
    }
  }, [session]);

  return {
    handleLogin,
    register,
    handleSubmit,
    getFieldState,
    loginRes: res,
  };
};
