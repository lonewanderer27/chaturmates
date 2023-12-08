import { atom } from "jotai";
import { GroupType, SearchHistoryType, StudentType } from "../../types";
import { SEARCH_CATEGORY } from "../../enums/search";

export const searchQueryAtom = atom<string>("");
export const searchHistoryAtom = atom<SearchHistoryType[]>([]);
export const showAllHistoryAtom = atom<boolean>(false);
export const studentsResultsAtom = atom<StudentType[]>([]);
export const groupsResultsAtom = atom<GroupType[]>([]);
export const searchCategoryAtom = atom<SEARCH_CATEGORY>(SEARCH_CATEGORY.ALL);