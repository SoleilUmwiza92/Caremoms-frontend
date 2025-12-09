import { useEffect, useState } from "react";
import { getMessages, sendMessageAPI } from "../api/messages";
import { useAuth } from "../auth/useAuth";

export default function useChat(roomId) {
  const { session } = useAuth();
  const token = session?.access_token;

  const [messages, setMessages] = useState([]);

  async function load() {
    const data = await getMessages(roomId, token);
    setMessages(data.reverse()); // newest last
  }

  async function sendMessage(content) {
    await sendMessageAPI(roomId, content, token);
    load();
  }

  useEffect(() => {
    if (!roomId || !token) return;
    load();

    const interval = setInterval(load, 2000);
    return () => clearInterval(interval);

  }, [roomId, token]);

  return { messages, sendMessage };
}
