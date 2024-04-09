import { ThreadType } from "../../types";
import { atom } from "jotai";

export const threadsAtom = atom<ThreadType[]>([]);