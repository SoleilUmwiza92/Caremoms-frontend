import { useEffect, useState } from "react";
import { getPosts, createPostAPI } from "../api/posts";
import { useAuth } from "../auth/useAuth";

export function usePosts() {
  const { session } = useAuth();
  const [posts, setPosts] = useState([]);

  async function load() {
    const data = await getPosts(session.access_token);
    setPosts(data);
  }

  async function createPost(content) {
    await createPostAPI(session.access_token, content);
    load();
  }

  useEffect(() => {
    if (session) load();
  }, [session]);

  return { posts, createPost };
}
