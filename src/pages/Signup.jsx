import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
import {
  Container, Box, Typography, TextField, Button, Stack
} from "@mui/material";

export default function Signup() {
  const { supabase } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setFeedback(error.message);
    else setFeedback("Check your email to confirm your account.");

    setLoading(false);
  }

  async function signupWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 3 }}>
        <Typography variant="h4" align="center">
          Join CareMoms
        </Typography>

        <Stack spacing={2} mt={3}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleSignup}
            disabled={!email || !password || loading}
          >
            Sign Up
          </Button>

          <Typography textAlign="center">OR</Typography>

          <Button variant="outlined" onClick={signupWithGoogle}>
            Continue with Google
          </Button>

          {feedback && (
            <Typography color="primary">{feedback}</Typography>
          )}
        </Stack>
      </Box>
    </Container>
  );
}
