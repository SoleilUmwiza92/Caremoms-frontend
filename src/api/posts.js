import { apiFetch } from "./client";

// GET /api/posts - list feed
export function getPosts(token) {
  return apiFetch("/posts", "GET", token);
}

// POST /api/posts - create new post
export function createPostAPI(token, content) {
  return apiFetch("/posts", "POST", token, { content });
}

// GET /api/posts/my-posts
export function getMyPosts(token) {
  return apiFetch("/posts/my-posts", "GET", token);
}
