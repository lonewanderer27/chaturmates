import { useState } from "react";
import { client } from "../../client";
import { OAuthResponse } from "@supabase/supabase-js";
import { useIonRouter } from "@ionic/react";
import { useLocation } from "react-router";

export default function useGoogle() {
  const rt = useLocation();
  const [res, setRes] = useState<OAuthResponse>();

  const handleGoogle = async () => {
    const oauth = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: rt.pathname,
      },
    });

    if (oauth.error) {
      console.log(oauth.error);
      setRes(oauth);
      return;
    }

    // google auth response
    console.log("google auth response");

    // check if the student record exists
    console.log("checking if the student record exists...");

    const user = await client.auth.getUser();

    if (user.error) {
      console.log(user.error);
      return;
    }

    const student = await client
      .from("students")
      .select("*")
      .eq("profile_id", user.data.user!.id)
      .single();

    if (student.error) {
      console.log(student.error);
      return;
    }

    if (student.data) {
      console.log("student record exists");
      console.log(student);
      return;
    }

    console.log("student record does not exist");
    console.log("creating student record...");

    const student2 = await client.from("students").insert([{
      school: 1,
      profile_id: user.data.user!.id,
      school_email: user.data.user!.email!,
      full_name: user.data.user!.user_metadata!.full_name!,
      verified: true,
    }]);

    if (student2.error) {
      console.log(student2.error);
      return;
    }

    console.log("student record created");
    console.log(student2);
  };

  return {
    handleGoogle,
    googleRes: res,
  };
}
