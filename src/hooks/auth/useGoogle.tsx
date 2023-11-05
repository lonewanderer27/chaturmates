import { useState } from "react"
import { client } from "../../client"
import { OAuthResponse } from "@supabase/supabase-js"
import { useIonRouter } from "@ionic/react";

export default function useGoogle() {
  const [res, setRes] = useState<OAuthResponse>();

  const handleGoogle = async () => {
    const response = await client.auth.signInWithOAuth({
      provider: 'google'
    })
    setRes(response);
  }

  return {
    handleGoogle,
    googleRes: res
  }
}
