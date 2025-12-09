import React, { useState } from "react";
import { Box, TextField, IconButton, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <Paper
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        borderRadius: 4
      }}
    >
      <TextField
        placeholder="Type a message…"
        variant="standard"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />

      <IconButton color="primary" onClick={send}>
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
