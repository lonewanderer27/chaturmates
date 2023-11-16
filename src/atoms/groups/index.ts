import { atom } from "jotai";
import { GroupType } from "../../types";

export const groupsAtom = atom<GroupType[]>([]);
export const showCreateGroupModalAtom = atom(false);