import { useEffect, useState } from "react";
import { client } from "../../client";
import { AuthResponse } from "@supabase/supabase-js";
import { SubmitHandler, set, useForm } from "react-hook-form";
import { useIonAlert, useIonRouter } from "@ionic/react";
import useSession from "./useSession";

export default function useSignup() {
  const hst = useIonRouter();
  const { session } = useSession();
  const [res, setRes] = useState<AuthResponse>();

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    getFieldState,
  } = useForm<SignupFormInputs>();

  const homePage = () => {
    hst.push("/discover");
  };

  const handleSignUp: SubmitHandler<SignupFormInputs> = (data) => {
    // clear the errors
    clearErrors();

    // attempt to signup user with password
    client.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
      },
    }).then(response => {
      if (response.data.session) {
        console.info("signup response:", response);
        // signup was successful
        setRes(response);
        
        // redirect user to home page
        homePage();
      } else {
        console.error(response.error);

        // notify the user that there has been an error
        show({
          header: "Alert",
          message: response.error?.message || "An error occurred. Please try again.",
          buttons: ["OK"],
        })
      }
    })
  };

  const [show] = useIonAlert();

  useEffect(() => {
    if (session) {
      homePage();
    }
  }, [session]);

  return {
    handleSignUp,
    signupRes: res,
    register,
    handleSubmit,
    getFieldState
  };
}
