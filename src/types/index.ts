import { Database } from "./supabase";

export type StudentType = Database["public"]["Tables"]["students"]["Row"];
export type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];
export type SearchHistoryType = Database["public"]["Tables"]["search_history"]["Row"];

export type GroupType = Database["public"]["Tables"]["groups"]["Row"];
export type GroupMemberType = Database["public"]["Tables"]["group_members"]["Row"];

export type ThreadType = Database["public"]["Tables"]["threads"]["Row"];
export type ThreadMessageType = Database["public"]["Tables"]["threads_messages"]["Row"];