import { useAtom } from "jotai";
import { groupsAtom } from "../../atoms/groups";
import { client } from "../../client";
import { GroupType } from "../../types";
import { useEffect } from "react";

export default function useGroups() {
  const [groups, setGroups] = useAtom(groupsAtom);

  async function getAll() {
    const response = await client.from("groups").select("*");
    console.log("groups response:", response);
    setGroups(response.data as GroupType[]);
  }

  useEffect(() => {
    getAll();
  }, [])

  return {
    groups
  }
}
