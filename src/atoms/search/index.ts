import { atom } from "jotai";
import { GroupPostType, GroupType, SearchHistoryType, StudentType } from "../../types";
import { SEARCH_CATEGORY } from "../../enums/search";
import { GroupsResponse } from "../../types/group";

export const searchQueryAtom = atom<string>("");
export const searchHistoryAtom = atom<SearchHistoryType[]>([]);
export const showAllHistoryAtom = atom<boolean>(false);
export const studentsResultsAtom = atom<StudentType[]>([]);
export const groupsResultsAtom = atom<GroupsResponse['getAll']['data']['groups']>([]);
export const groupPostsResultsAtom = atom<GroupPostType[]>([]);
export const searchCategoryAtom = atom<SEARCH_CATEGORY>(SEARCH_CATEGORY.ALL);