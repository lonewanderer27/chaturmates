import { useEffect, useState } from "react";
import { GroupType } from "../../types";
import { client } from "../../client";

export default function useGroup(vanity_url?: string) {
  const [group, setGroup] = useState<GroupType>();

  async function get() {
    if (vanity_url) {
      const response = await client
        .from("groups")
        .select("*")
        .eq("vanity_url", vanity_url)
        .single();
      console.log("useGroup response", response);
      setGroup(response.data as GroupType);
    }
  }

  useEffect(() => {
    get();
  }, [vanity_url]);

  return {
    group,
  };
}
