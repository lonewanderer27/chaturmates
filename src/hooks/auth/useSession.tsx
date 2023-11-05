import { useEffect, useState } from "react"
import { client } from "../../client";
import { Session } from "@supabase/supabase-js";

export default function useSession() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [nickname, setNickname] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setNickname(
        session?.user.user_metadata.full_name.split(" ")[0]+
        " "+session?.user.user_metadata.full_name.split(" ")[2]
      )
    })

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setNickname(
        session?.user.user_metadata.full_name.split(" ")[0]+
        " "+session?.user.user_metadata.full_name.split(" ")[2]
      )
    })

    return () => subscription.unsubscribe()
  }, [])

  console.info(session?.user)

  return {
    session,
    nickname
  }
}
