import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "./supabaseClient";
import { syncUserFromSupabase, getCurrentUser } from "../api/users";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [supabaseSession, setSupabaseSession] = useState(null);
  const [backendUser, setBackendUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load backend user safely
  const loadBackendUser = useCallback(async () => {
    try {
      const user = await getCurrentUser();
      setBackendUser(user);
    } catch (err) {
      console.error("Failed to load backend user:", err?.message);
      setBackendUser(null);
    }
  }, []);


  const handleSessionChange = useCallback(
    async (session) => {
      const token = session?.access_token ?? null;
      setSupabaseSession(session || null);
      setAccessToken(token);

      if (!token) {
        console.log("User logged out");
        localStorage.removeItem("supabaseToken");
        setBackendUser(null);
        return;
      }

      console.log("User logged in");
      localStorage.setItem("supabaseToken", token);

      try {
        await syncUserFromSupabase(); //backend sync
        await loadBackendUser(); // backend profile load
      } catch (err) {
        console.error("Error syncing user:", err?.message);
      }
    },
    [loadBackendUser]
  );

  // Initial session + auth listener
  useEffect(() => {
    let active = true;

    async function initSession() {
      try {
        const { data } = await supabase.auth.getSession();
        if (active && data?.session) {
          await handleSessionChange(data.session);
        }
      } catch (err) {
        console.error("Error getting initial session:", err?.message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (active) {
          await handleSessionChange(session);
          setLoading(false);
        }
      }
    );


    return () => {
      active = false;

      if (listener?.subscription) {
        listener.subscription.unsubscribe();
      }
    };
  }, [handleSessionChange]);

  return (
    <AuthContext.Provider
      value={{
        supabase,
        supabaseSession,
        backendUser,
        accessToken,
        loading,
        isAuthenticated: Boolean(backendUser),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}