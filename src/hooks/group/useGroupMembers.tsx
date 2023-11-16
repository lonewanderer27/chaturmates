import { useEffect, useState } from "react";
import { GroupMemberType } from "../../types";
import { client } from "../../client";
import { useIonLoading } from "@ionic/react";

export default function useGroupMembers(group_id: number) {
  const [load, dismiss] = useIonLoading();
  const [groupMembers, setGroupMembers] = useState<GroupMemberType[]>([]);

  async function getAll() {
    // load();
    const response = await client
    .from("group_members")
    .select("*")
    .eq("group_id", group_id)
    console.log("group_members response:", response);
    // dismiss();
    setGroupMembers(response.data as GroupMemberType[]);
  }

  useEffect(() => {
    getAll();
  }, [group_id])

  return {
    groupMembers,
  };
}
