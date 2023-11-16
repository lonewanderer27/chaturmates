import { useEffect } from "react";
import { GroupType } from "../../types";
import { client } from "../../client";
import { useAtom } from "jotai";
import { groupsResultsAtom } from "../../atoms/search";

export default function useGroupSearch() {
  const [groupsResults, setGroupsResults] = useAtom(groupsResultsAtom);

  async function getAll() {
    const response = await client
      .from("groups")
      .select("*")
      .order("created_at", { ascending: false });
    console.log("groupsResults response:", response);
    setGroupsResults((response.data as GroupType[]) ?? []);
  }

  const handleGroupSearch = async (query: string) => {
    if (query.length === 0) {
      getAll();
      return;
    } else {
      const response = (
        await client
          .from("groups")
          .select("*")
          .ilike("name", `%${query}%`)
          .order("created_at", { ascending: false })
      ).data;
      setGroupsResults((response as GroupType[]) ?? []);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return {
    handleGroupSearch,
    groupsResults,
  };
}
