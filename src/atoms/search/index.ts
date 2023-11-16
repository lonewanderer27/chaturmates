import { atom } from "jotai";
import { GroupType, SearchHistoryType, StudentType } from "../../types";

export const searchQueryAtom = atom<string>("");
export const searchHistoryAtom = atom<SearchHistoryType[]>([]);
export const showAllHistoryAtom = atom<boolean>(false);
export const studentsResultsAtom = atom<StudentType[]>([]);
export const groupsResultsAtom = atom<GroupType[]>([]);