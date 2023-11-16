import { useIonRouter } from "@ionic/react";
import useSession from "../auth/useSession";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { VerificationFormInputs } from "../../types/verification";
import { client } from "../../client";

export default function useVerify() {
  const hst = useIonRouter();
  const { session } = useSession();

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    clearErrors,
    getFieldState,
  } = useForm<VerificationFormInputs>();

  const handleVerify: SubmitHandler<VerificationFormInputs> = (data) => {
    // clear the errors
    clearErrors();

    if (data) {
      // update the student's verified status to true
      const res = client
        .from("students")
        .update({
          verified: true,
        })
        .eq("profile_id", session!.user.id);

      // redirect user to home page
      hst.push("/discover");
    }
  };

  return {
    handleVerify,
    register,
    handleSubmit,
    getFieldState,
  };
}
