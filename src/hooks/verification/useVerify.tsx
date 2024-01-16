import {SubmitHandler, useForm} from "react-hook-form";

import VerificationEmail from "../../components/Verification/VerificationEmail";
import {VerificationFormInputs} from "../../types/verification";
import {client} from "../../client";
import emailjs from '@emailjs/browser';
import {useIonAlert, useIonRouter} from "@ionic/react";
import useProfile from "../profile/useProfile";
import useSession from "../auth/useSession";
import {useState} from "react";
import useSelfStudent from "../student/useSelfStudent";
import dayjs from "dayjs";

export default function useVerify() {
  const [processing, setProcessing] = useState<boolean>(false);
  const [show] = useIonAlert();
  const rt = useIonRouter();
  const {session} = useSession();
  const {student} = useSelfStudent();
  const [otpInput, setOtpInput] = useState<string>();

  const handleVerify = async (otpInput2?: string) => {
    // log the data
    console.log("otpInput", otpInput);
    console.log("otpInput2", otpInput2);

    const otp_code = await client
        .from("otp_codes")
        .select("*")
        .eq("email", student!.school_email)
        .eq("code", otpInput2 ?? otpInput!)
        // .gt("created_at", dayjs().subtract(5, 'minutes').format("YYYY-MM-DDTHH:mm:ss"))
        .limit(1)
        .single();

    if (otp_code.error) {
      // this means 5 minutes have passed since the otp was sent
      // or the otp was not found
      console.log(otp_code.error);

      await show({
        header: "Error",
        message: "The OTP has expired. Please request a new one.",
        buttons: ["OK"]
      });

      // set sending to false
      setProcessing(false);

      return;
    }

    // the otp was found
    // update the student's verified status to true
    const res = await client
        .from("students")
        .update({
          verified: true,
        })
        .eq("id", student!.id)
        .select("*")
        .single();

    if (res.error) {
      // log the error
      console.error(res.error);
      await show({
        header: "Error",
        message: "Something went wrong. Please try again later.",
        buttons: ["OK"]
      });

      // set sending to false
      setProcessing(false);

      return;
    }

    // set sending to false
    setProcessing(false);

    // redirect user to home page
    rt.push("/discover");

    location.reload();
  }

  const handleSend = async () => {
    // set sending to true
    setProcessing(true);

    // generate otp
    const otp = Math.floor(100000 + Math.random() * 900000);

    // save otp to database
    // @ts-ignore
    const otpRes = await client.from("otp_codes").insert(
        {
          email: student!.school_email,
          code: otp,
        }
    ).select("*").single();

    // if otp insert fails, alert the user then return
    if (otpRes.error) {
      // log the error
      console.error(otpRes.error);
      await show({
        header: "Error",
        message: "Something went wrong. Please try again later.",
        buttons: ["OK"]
      });

      // set sending to false
      setProcessing(false);

      return;
    }

    const emailRes = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: student!.full_name!.split(" ")[0],
          full_name: student!.full_name,
          target_email: student!.school_email,
          reply_to: "chaturmates.info@gmail.com",
          otp: otp
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )

    // if email send fails, alert the user then return
    if (emailRes.status !== 200) {
      await show({
        header: "Error",
        message: "Something went wrong. Please try again later.",
        buttons: ["OK"]
      });

      // set sending to false
      setProcessing(false);
      return;
    }

    // log the email response
    console.log(emailRes);

    // set sending to false
    setProcessing(false);
  }

  return {
    handleVerify,
    handleSend,
    otp: otpInput,
    setOtp: setOtpInput,
    sending: processing
  }
}
