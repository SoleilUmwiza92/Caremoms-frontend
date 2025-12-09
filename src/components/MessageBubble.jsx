import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useAuth } from "../auth/useAuth";

export default function MessageBubble({ msg }) {
  const { session } = useAuth();
  const isMe = msg.sender.supabaseId === session.user.id;

  return (
    <Box display="flex" justifyContent={isMe ? "flex-end" : "flex-start"}>
      <Paper
        sx={{
          p: 1.5,
          maxWidth: "75%",
          bgcolor: isMe ? "primary.main" : "grey.200",
          color: isMe ? "white" : "black",
          borderRadius: 3,
        }}
      >
        <Typography variant="body1">{msg.content}</Typography>
        <Typography variant="caption">
          {new Date(msg.createdAt).toLocaleTimeString()}
        </Typography>
      </Paper>
    </Box>
  );
}
