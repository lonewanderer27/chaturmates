import {SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import {boolean, object, ref, string} from "yup";
import {useIonAlert, useIonRouter} from "@ionic/react";

import {AuthResponse} from "@supabase/supabase-js";
import {client} from "../../client";
import useSession from "./useSession";
import {useState} from "react";
import {yupResolver} from "@hookform/resolvers/yup";

export default function useSignup() {
  const hst = useIonRouter();
  const { session } = useSession();
  const [res, setRes] = useState<AuthResponse>();

  const [registering, setRegistering] = useState(false);

  const formSchema = object().shape({
    email: string().email().required().label("Email").matches(/^[a-zA-Z0-9._%+-]+@adamson\.edu\.ph$/, "Must be an Adamson mail"),
    // email: string().email().required().label("Email").matches(/^[a-zA-Z0-9._%+-]+@protonmail\.ch$/, "Must be a ProtonMail"),
    fullName: string().required().label("Full Name"),
    password: string().required().label("Password"),
    passwordConfirmation: string().required("Confirm Password is a required field").oneOf([ref("password")], "Passwords must match"),
    agreeToTerms: boolean().required("You must agree to the terms and conditions")
  })

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    getFieldState,
    getValues,
    setValue,
    control,
    trigger,
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(formSchema)
  });

  const homePage = () => {
    hst.push("/discover");
  };

  const verifyPage = () => {
    hst.push("/verify");
  }

  const [show] = useIonAlert();

  const handleError: SubmitErrorHandler<SignupFormInputs> = (data) => {
    // log the data
    console.log("handleError is called");
    console.log(data);

    // check if email has error
    if (data.email) {
      show({
        header: "Error",
        message: data.email.message,
        buttons: ["OK"],
      })
      return;
    }

    // check if fullName has error
    if (data.fullName) {
      show({
        header: "Error",
        message: data.fullName.message,
        buttons: ["OK"],
      })
      return;
    }

    // check if password has error
    if (data.password) {
      show({
        header: "Error",
        message: data.password.message,
        buttons: ["OK"],
      })
      return;
    }

    // check if passwordConfirmation has error
    if (data.passwordConfirmation) {
      show({
        header: "Error",
        message: data.passwordConfirmation.message,
        buttons: ["OK"],
      })
      return;
    }

    // check if agreeToTerms has error
    if (data.agreeToTerms) {
      show({
        header: "Error",
        message: data.agreeToTerms.message,
        buttons: ["OK"],
      })
    }
  }

  const handleSignUp: SubmitHandler<SignupFormInputs> = async (data) => {
    // log the data
    console.log("handleSignUp is called");
    console.log(data);

    // set signing in to true
    setRegistering(true);

    // clear the errors
    clearErrors();

    // attempt to signup user with password
    const response = await client.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
      },
    });

    if (response.error) {
      console.error(response.error);

      // notify the user that there has been an error
      show({
        header: "Error",
        message: response.error?.message || "An error occurred. Please try again.",
        buttons: ["OK"],
      })

      // set signing in to false
      setRegistering(false);

      return;
    }

    // if (response.data?.user) {
    //   console.info("signup response:", response);
    //   // signup was successful
    //   setRes(response);
      
    //   // redirect user to home page
    //   homePage();

    //   // set signing in to false
    //   setRegistering(false);
    // }

    // create a student with unverified email
    const student = await client
      .from("students")
      .insert({
        school: 1,
        profile_id: response.data.user!.id,
        school_email: response.data.user!.email!,
        full_name: data.fullName,
        verified: false,
      })

    if (student.error) {
      console.error(student.error);

      // notify the user that there has been an error
      show({
        header: "Error",
        message: student.error?.message || "An error occurred. Please try again.",
        buttons: ["OK"],
      })

      // set signing in to false
      setRegistering(false);

      return;
    }

    // send verification email
  };

  return {
    handleSignUp,
    handleError,
    signupRes: res,
    register,
    handleSubmit,
    getFieldState,
    getValues,
    setValue,
    control,
    trigger,
    registering
  };
}
