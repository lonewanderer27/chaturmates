import { useState } from "react";
import { client } from "../../client";
import { OAuthResponse } from "@supabase/supabase-js";
import { useIonRouter } from "@ionic/react";

export default function useGoogle() {
  const rt = useIonRouter();
  const [res, setRes] = useState<OAuthResponse>();

  // const handleGoogleAsync = async () => {
  //   const resG = await client.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: rt.routeInfo.pathname,
  //     },
  //   });

  //   if (resG.error) {
  //     console.log(resG.error);
  //     setRes(resG);
  //     return;
  //   }

  //   const res = await client.auth.signInWithOAuth({
  //     provider: "google",
  //     options: {
  //       redirectTo: rt.routeInfo.pathname,
  //     },
  //   });
  // };

  const handleGoogle = () => {
    client.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: rt.routeInfo.pathname,
          queryParams: {
            prompt: "select_account"
          }
        },
      })
      .then((response) => {
        if (response.data) {
          console.log("google auth response");
          client.auth.getUser().then((user) => {
            console.log("checking if the student record exists...");
            if (user.data.user) {
              client
                .from("students")
                .select("*")
                .eq("profile_id", user.data.user.id)
                .single()
                .then((response2) => {
                  if (response2.data) {
                    console.log("student record exists");
                    console.log(response2);
                  } else {
                    console.log("student record does not exist");
                    console.log("creating student record...");
                    client
                      .from("students")
                      .insert([
                        {
                          school: 1,
                          profile_id: user.data.user!.id,
                          school_email: user.data.user!.email!,
                          full_name: user.data.user!.user_metadata!.full_name!,
                          verified: true,
                        },
                      ])
                      .then((response3) => {
                        console.log(response3);
                      });
                  }
                });
            }
          });
        }
      });
    // setRes(response);
  };

  // const createStudent = async () => {
  //   // only gets triggered by handleGoogle which is only called
  //   // when an adamson email is used to sign in

  //   // get the last inserted profile id
  //   const user = await client.auth.getUser();

  //   // check if we already have a student record for this user
  //   console.log("Checking if student record exists...");
  //   const response3 = await client
  //     .from("students")
  //     .select()
  //     .eq("profile_id", user.data.user!.id);
  //   console.log(response3);

  //   if (response3 && response3.data?.length! > 0) {
  //     // student record already exists
  //     return;
  //   }

  //   // create a student record
  //   console.log("Creating student record...");
  //   const response2 = await client
  //     .from("students")
  //     .insert([
  //       {
  //         school: 1,
  //         profile_id: user.data.user!.id,
  //         school_email: user.data.user!.email!,
  //         full_name: user.data.user!.user_metadata!.full_name!,
  //         verified: true,
  //       },
  //     ])
  //     .select();
  //   console.log(response2);
  // };

  return {
    handleGoogle,
    googleRes: res,
  };
}
