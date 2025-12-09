import { apiFetch } from "./client";

// GET /api/messages/:roomId?limit=25
export function getMessages(roomId, token, limit = 25) {
  return apiFetch(`/messages/${roomId}?limit=${limit}`, "GET", token);
}

// POST /api/messages
export function sendMessageAPI(roomId, content, token) {
  return apiFetch(`/messages`, "POST", token, {
    roomId,
    content,
  });
}

// DELETE /api/messages/:id
export function deleteMessageAPI(messageId, token) {
  return apiFetch(`/messages/${messageId}`, "DELETE", token);
}
