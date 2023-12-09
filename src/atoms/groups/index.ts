import { atom } from "jotai";
import { GroupType } from "../../types";
import { CreateGroupInputs, GroupCreateInputs } from "../../types/group";

export const groupsAtom = atom<GroupType[]>([]);
export const showCreateGroupModalAtom = atom(false);
export const newGroupAtom = atom<GroupCreateInputs>({
  step1: {
    name: "",
    description: "",
  },
  step2: {
    avatar_url: "",
    cover_url: "",
    vanity_url: ""
  },
  step3: {
    school: 0,
    college: 0,
    course: 0,
    semester: 0,
    academic_year_id: 0,
  },
});