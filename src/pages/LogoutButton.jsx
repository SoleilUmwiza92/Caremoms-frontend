import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import { Button } from "@mui/material";

export default function LogoutButton() {
  const { signOut } = useContext(AuthContext);

  async function handleLogout() {
    await signOut();
    window.location.href = "/login";
  }

  return (
    <Button variant="outlined" color="error" onClick={handleLogout}>
      Logout
    </Button>
  );
}
