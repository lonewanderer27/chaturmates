import { atom } from "jotai";
import { StudentType } from "../../types";

export const studentsAtom = atom<StudentType[]>([]);
export const studentAtom = atom<StudentType | null>(null);