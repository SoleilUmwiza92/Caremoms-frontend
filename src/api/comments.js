
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export async function getCommentsAPI(postId, token) {
  const res = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch comments");

  return res.json();
}

export async function createCommentAPI(postId, content, token) {
  const res = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("Failed to create comment");

  return res.json();
}

export async function deleteCommentAPI(commentId, token) {
  const res = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete comment");
}


export function fetchComments(postId, token) {
  return getCommentsAPI(postId, token);
}

export function createComment(postId, content, token) {
  return createCommentAPI(postId, content, token);
}
