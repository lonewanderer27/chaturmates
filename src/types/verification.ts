import { OtpCodeType } from "."

export interface VerificationFormInputs {
  email: string,
  otp: string
}

export interface OTPCodeResponse {
  create: {
    data: OtpCodeType,
    message: string,
    success: boolean,
    error: null
  }
}