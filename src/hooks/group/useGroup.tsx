import { useEffect, useState } from "react";
import { GroupType } from "../../types";
import { client } from "../../client";

export default function useGroup(vanity_id?: string) {
  const [group, setGroup] = useState<GroupType>();

  async function get() {
    if (vanity_id) {
      const response = await client
        .from("groups")
        .select("*")
        .eq("vanity_id", vanity_id)
        .single();
      console.log("useGroup response", response);
      setGroup(response.data as GroupType);
    }
  }

  useEffect(() => {
    get();
  }, [vanity_id]);

  return {
    group,
  };
}
