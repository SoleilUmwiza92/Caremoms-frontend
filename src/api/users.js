const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export async function authFetch(path, options = {}) {
  const token = localStorage.getItem("supabaseToken");

  const res = await fetch(API_BASE_URL + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: "Bearer " + token } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Request failed with status " + res.status + ": " + text);
  }

  // SAFE JSON PARSING (THIS FIXES YOUR ERROR PERMANENTLY)
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }

  return null;
}

// Sync Supabase → Spring Boot user
export function syncUserFromSupabase() {
  return authFetch("/auth/validate", { method: "POST" });
}

// Get logged-in backend user
export function getCurrentUser() {
  return authFetch("/users/me", { method: "GET" });
}

// Update user profile
export function updateCurrentUserProfile(data) {
  return authFetch("/users/me", {
    method: "PUT",
    body: JSON.stringify(data),
  });
}
