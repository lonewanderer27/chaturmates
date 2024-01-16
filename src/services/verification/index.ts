import { OtpCodeType } from "../../types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { client } from "../../client"

export async function sendOTP(student_id: number): Promise<PostgrestSingleResponse<OtpCodeType>> {
  // generate random 6 digit number
  const otp = Math.floor(100000 + Math.random() * 900000);

  // save otp in database
  const otp_code = await client.from("otp").insert({
    student_id,
    otp,
  }).select("*").single();

  if (!otp_code) {
    throw new Error("OTP not saved");
  }

  return otp_code;
}

export function verifyOTP() {
  
}