import { useState } from "react"
import { ThreadType } from "../../types"

export default function useNewMessage() {
  const [messages, setMessages] = useState<ThreadType[]>([]);

  return {
    
  }
}
