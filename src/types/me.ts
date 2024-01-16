import {StudentRegType} from "./index";

export interface ChangePassInputs {
  // oldPass: string;
  newPass: string;
  confirmPass: string;
}

export interface UpdateProfileInputs {
  fullName: string;
  description?: string;
  type: StudentRegType;
}