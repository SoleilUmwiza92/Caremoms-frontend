import React from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {post.user.displayName || post.user.email}
        </Typography>

        <Typography variant="body1" sx={{ mt: 1 }}>
          {post.content}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to={`/post/${post.id}/comments`}>Comments</Link>
          <span>{new Date(post.createdAt).toLocaleString()}</span>
        </Box>
      </CardContent>
    </Card>
  );
}
