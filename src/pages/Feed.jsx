import React, { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import { Box, Container, Card, TextField, Button, Typography, Stack } from "@mui/material";
import PostCard from "../components/PostCard";

export default function Feed() {
  const { posts, createPost } = usePosts();
  const [content, setContent] = useState("");

  async function handleCreatePost() {
    if (!content.trim()) return;
    await createPost(content);
    setContent("");
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Typography variant="h4" mb={2}>Community Feed</Typography>

      {/* Create Post */}
      <Card sx={{ p: 2, mb: 3 }}>
        <Stack spacing={2}>
          <TextField
            placeholder="Share your thoughts…"
            multiline
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="contained" onClick={handleCreatePost}>
            Post
          </Button>
        </Stack>
      </Card>

      {/* Posts list */}
      <Stack spacing={2}>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </Stack>
    </Container>
  );
}
