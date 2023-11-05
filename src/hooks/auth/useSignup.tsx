import { useState } from "react";
import { client } from "../../client";
import { AuthResponse } from "@supabase/supabase-js";

export default function useSignup() {
  const [res, setRes] = useState<AuthResponse>();

  const handleSignUp = async (email: string, password: string) => {
    const response = await client.auth.signUp({
      email,
      password
    });
    setRes(response);
  };

  return {
    handleSignUp
  }
}
