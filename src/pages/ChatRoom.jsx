import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Stack } from "@mui/material";

import ChatInput from "../components/ChatInput";
import MessageBubble from "../components/MessageBubble";
import useChat from "../hooks/useChat";

export default function ChatRoom() {
  const { roomId } = useParams();
  const { messages, sendMessage } = useChat(roomId);

  return (
    <Container maxWidth="sm" sx={{ mt: 3, height: "80vh", display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" mb={2}>
        Chat Room: {roomId}
      </Typography>

      <Stack spacing={2} sx={{ flexGrow: 1, overflowY: "auto", mb: 2 }}>
        {messages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
      </Stack>

      <ChatInput onSend={sendMessage} />
    </Container>
  );
}
