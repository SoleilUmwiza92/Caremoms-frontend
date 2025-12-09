import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { getProfile, updateProfileAPI } from "../api/users";


export function useProfile() {
  const { session } = useAuth();
  const token = session?.access_token;

  const [profile, setProfile] = useState({});

  async function load() {
    const data = await getProfile(token);
    setProfile(data);
  }

  async function updateProfile(payload) {
    await updateProfileAPI(token, payload);
    load();
  }

  useEffect(() => {
    if (token) load();
  }, [token]);

  return { profile, updateProfile };
}
