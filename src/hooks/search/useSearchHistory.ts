import { useEffect } from "react";
import { SearchHistoryType } from "../../types";
import { client } from "../../client";
import useProfile from "../profile/useProfile";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../../atoms/search";
import { useQuery } from "@tanstack/react-query";

export default function useSearchHistory() {
  const { profile } = useProfile();
  // const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const shQuery = useQuery({
    queryKey: ["search_history"],
    queryFn: async () => {
      const res = await client
        .from("search_history")
        .select("*")
        .order("created_at", { ascending: false })
        .eq("profile_id", profile!.id)
        .eq("hide", false)
        .limit(20) // add limit to fetch only the last 30 items
      // setSearchHistory(res.data as SearchHistoryType[]);
      return res.data;
    },
    enabled: !!profile,
    refetchOnWindowFocus: true,
  })

  // useEffect(() => {
  //   // query the previous search history
  //   shQuery.refetch();

  //   // subscribe to the search history changes
  //   const channel = client
  //     .channel("search_history_changes")
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "*",
  //         schema: "public",
  //         table: "search_history",
  //       },
  //       (payload) => {
  //         // payload will contain the new data
  //         const newp = payload.new as SearchHistoryType;

  //         // compare if the payload's id is the same as the current profile id
  //         if (newp.id === Number(profile!.id)) {
  //           setSearchHistory((prev) => [...prev, newp]);
  //         }
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     channel.unsubscribe();
  //   };
  // }, [profile]);

  const handleHide = async (id: number) => {
    // hide from the search history
    const response = await client
      .from("search_history")
      .update({
        hide: true,
      })
      .eq("id", id)
      .select("*")
      .single();

    if (!response.error) {
      // remove the search history from the atom state
      // setSearchHistory(prev => {
      //   return prev.filter(item => item.id !== id)
      // })
      shQuery.refetch();
    }
  };

  return {
    searchHistory: shQuery.data as SearchHistoryType[] | undefined,
    handleHide,
  };
}
