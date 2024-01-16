import {useEffect, useState} from "react";
import {client} from "../../client";
import {Session} from "@supabase/supabase-js";
import {useAtom} from "jotai";
import {passwordResetEmailAtom} from "../../atoms/auth";
import {useIonRouter} from "@ionic/react";

export default function useSession() {
  const rt = useIonRouter()
  const [passwordResetEmail, setPasswordResetEmail] = useAtom(
      passwordResetEmailAtom
  );
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [nickname, setNickname] = useState<string | null | undefined>(
      undefined
  );

  useEffect(() => {
    client.auth.getSession().then(({data: {session}}) => {
      setSession(session);
      setNickname(session?.user.user_metadata.full_name.split(" ")[0]);
    });

    const {
      data: {subscription},
    } = client.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setNickname(session?.user.user_metadata.full_name.split(" ")[0]);

      if (_event === "PASSWORD_RECOVERY") {
        setPasswordResetEmail(session!.user.email!);

        // redirect the user to the account page
        // rt.push("/me")

        // then prompt the user for a new password
        // TODO: implement the ChangePasswordModal for this
        let newPassword: string | null = null;

        while (!newPassword && newPassword?.length === 0) {
          newPassword = prompt("Please enter your new password");
        }

        const {data, error} = await client.auth.updateUser({
          password: newPassword!,
        });

        if (data) alert("Password updated successfully!")
        if (error) alert("There was an error updating your password.")
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
    nickname,
  };
}
