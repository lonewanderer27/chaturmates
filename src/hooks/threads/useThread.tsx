import { useEffect, useState } from "react";
import { client } from "../../client";
import { ThreadType } from "../../types";
import useSelfStudent from "../student/useSelfStudent";

interface UserPressed {
  id: profile_id; // Assuming you have some unique identifier for the user
}

export default function useThread(userPressed: UserPressed) {
  const [thread, setThread] = useState<ThreadType>();

  function getOrCreateThread() {
    if (!userPressed) {
      return;
    }

    
    client
      .from("threads")
      .select("*")
      .in("users", [useSelfStudent, userPressed.id])
      .then((response) => {
        const existingThread = response.data[0] as ThreadType;

        if (existingThread) {
        
          setThread(existingThread);
        } else {
          
          client
            .from("threads")
            .create({
              users: [useSelfStudent, userPressed.id],
            })
            .then((newThreadResponse) => {
              setThread(newThreadResponse.data as ThreadType);
            })
            .catch((error) => {
              console.error("Error creating new thread:", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching thread:", error);
      });
  }

  useEffect(() => {
    getOrCreateThread();
  }, [userPressed]);

  return {
    thread,
  };
}
