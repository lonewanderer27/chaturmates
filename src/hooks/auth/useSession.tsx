import { useEffect, useState } from "react"
import { client } from "../../client";
import { Session } from "@supabase/supabase-js";
import { useAtom } from "jotai";
import { passwordResetEmailAtom } from "../../atoms/auth";

export default function useSession() {
  const [passwordResetEmail, setPasswordResetEmail] = useAtom(passwordResetEmailAtom);
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [nickname, setNickname] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setNickname(
        session?.user.user_metadata.full_name.split(" ")[0]+
        " "+session?.user.user_metadata.full_name.split(" ").slice(-1)[0]
      )
    })

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setNickname(
        session?.user.user_metadata.full_name.split(" ")[0]+
        " "+session?.user.user_metadata.full_name.split(" ").slice(-1)[0]
      )

      if (_event === "PASSWORD_RECOVERY") {
        setPasswordResetEmail(session!.user.email!)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  return {
    session,
    nickname
  }
}
