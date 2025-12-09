import { apiFetch } from "./client";

export const ChatAPI = {
  getMyRooms: () => apiFetch("/chat/rooms"),
  createDirectRoom: (payload) => apiFetch("/chat/room", { method: "POST", body: JSON.stringify(payload) }),
  getRoomInfo: (roomId) => apiFetch(`/chat/room/${roomId}`)
};
