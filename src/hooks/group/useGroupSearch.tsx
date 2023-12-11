import { useEffect } from "react";
import { client } from "../../client";
import { useAtom } from "jotai";
import { groupsResultsAtom } from "../../atoms/search";
import { GroupsResponse } from "../../types/group";

export default function useGroupSearch() {
  const [groupsResults, setGroupsResults] = useAtom(groupsResultsAtom);

  async function getAll() {
    const response = await client
      .from("groups")
      .select("*, group_members(*)")
      .eq("admin_uni_group", false)
      .order("created_at", { ascending: true });
    console.log("groupsResults response:", response);
    setGroupsResults(
      response.data as GroupsResponse["getAll"]["data"]["groups"]
    );
  }

  const handleGroupSearch = async (query: string) => {
    if (query.length === 0) {
      getAll();
      return;
    } else {
      const response = (
        await client
          .from("groups")
          .select("*, group_members(*)")
          .ilike("name", `%${query}%`)
          .eq("admin_uni_group", false)
          .order("created_at", { ascending: true })
      ).data;
      setGroupsResults(response as GroupsResponse["getAll"]["data"]["groups"]);
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
