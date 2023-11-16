import { useEffect, useState } from "react";
import useSession from "../auth/useSession"
import { ProfileType } from "../../types";
import { client } from "../../client";

export default function useProfile() {
  const { session } = useSession();
  const [profile, setProfile] = useState<ProfileType>();

  useEffect(() => {
    (async () => {
      if (session) {
        const response = (await client.from("profiles").select("*").eq("id", session.user.id).single()).data;
        setProfile(response as ProfileType);
      }
    })();
  }, [session])

  return {
    profile
  }
}
