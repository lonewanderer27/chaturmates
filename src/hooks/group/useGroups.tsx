import { useAtom } from "jotai";
import { groupsAtom } from "../../atoms/groups";
import { client } from "../../client";
import { GroupType } from "../../types";
import { useEffect } from "react";
import { GroupsResponse } from "../../types/group";

export default function useGroups() {
  const [groups, setGroups] = useAtom(groupsAtom);

  async function getAll() {
    const response = await client.from("groups").select("*, group_members(*, students(*))");
    console.log("groups response:", response);
    setGroups(response.data as GroupsResponse['getAll']['data']['groups']);
  }

  useEffect(() => {
    getAll();
  }, [])

  return {
    groups
  }
}
