import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useIonAlert, useIonRouter} from "@ionic/react";

import {AuthTokenResponse} from "@supabase/supabase-js";
import {client} from "../../client";
import useSession from "./useSession";

export const useLogin = () => {
  const [loggingIn, setLoggingIn] = useState(false);
  const hst = useIonRouter();
  const {session} = useSession();
  const [res, setRes] = useState<AuthTokenResponse>();

  function homePage() {
    hst.push("/");
  }

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    getFieldState,
    formState,
    trigger,
    getValues,
    control,
    setValue
  } = useForm<LoginFormInputs>();

  const [show] = useIonAlert();

  const handleError: SubmitErrorHandler<LoginFormInputs> = (data) => {
    console.log("handleError is called");
    console.log(data);
  }

  const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log("handleLogin is called");
    console.log(data);
    setLoggingIn(() => true);

    // clear the errors
    clearErrors();

    // attempt to signin user with password
    const response = await client.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    // inform the user if there is an error
    if (response.error) {
      console.log(response.error);
      // set errors to fields
      setError("password", {
        type: "custom",
        message: "Invalid email or password",
      });

      // set logging in state to false
      setLoggingIn(() => false);
      return;
    }

    // log the signin response
    console.log("signin response: ", response);

    // find the profile and related student
    const profile = await client
        .from("profiles")
        .select("*, students(*)")
        .eq("id", response.data.user.id)
        .single()

    // log the profile and student
    console.log("profile response:", profile.data);

    // if there's no student record, this means the user haven't verified their school email yet
    // warn the user for now
    if (profile.data!.students.length === 0 || 
        !profile.data!.hasOwnProperty("students") || 
        !profile.data!.students[0].hasOwnProperty("verified")) {
      await show({
        header: "Alert",
        message: "Please verify your school email first before logging in.",
        buttons: ["OK"],
      });

      // sign out the user
      await client.auth.signOut();

      // set logging in state to false
      setLoggingIn(() => false);

      return;
    }

    // set the session to the response
    setRes(response);

    // set logging in state to false
    setLoggingIn(() => false);

    // redirect the user to the home page
    homePage();
  }

  return {
    handleLogin,
    handleError,
    register,
    handleSubmit,
    getFieldState,
    loginRes: res,
    formState,
    trigger,
    getValues,
    setValue,
    control,
    loggingIn
  };
};

