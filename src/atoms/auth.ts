import { atom } from "jotai";

export const emailAtom = atom("");
const passwordAtom = atom("");
const passwordConfirmationAtom = atom("");
export const passwordResetEmailAtom = atom<string | null>(null);