import { atom } from "jotai";
import { GroupType } from "../../types";
import { CreateGroupInputs, GroupCreateInputs } from "../../types/group";
import { NEW_GROUP } from "../../constants/groups";

export const groupsAtom = atom<GroupType[]>([]);
export const showCreateGroupModalAtom = atom(false);
export const newGroupAtom = atom<GroupCreateInputs>(NEW_GROUP);