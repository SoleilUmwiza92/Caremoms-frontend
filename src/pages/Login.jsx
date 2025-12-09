import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import useAuth from "../auth/useAuth";

export default function Login() {
  const { supabase, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Email OTP login
  const signInWithEmail = async () => {
    if (!email) return;

    try {
      setLoading(true);
      setFeedback("");

      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) {
        setFeedback(error.message);
      } else {
        setFeedback("Magic link sent. Check your email.");
      }
    } catch (err) {
      console.error("OTP login failed:", err);
      setFeedback("Failed to send magic link.");
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth login
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setFeedback("");

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        setFeedback(error.message);
      }
    } catch (err) {
      console.error("Google login failed:", err);
      setFeedback("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  // If already logged in → redirect
  if (isAuthenticated) {
    navigate("/profile");
    return null;
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          CareMoms
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          gutterBottom
        >
          A supportive community for moms.
        </Typography>

        <Stack spacing={2} mt={2}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={signInWithEmail}
            disabled={!email || loading}
            fullWidth
          >
            Send magic link
          </Button>

          <Typography align="center">or</Typography>

          <Button
            variant="outlined"
            onClick={signInWithGoogle}
            disabled={loading}
            fullWidth
          >
            Continue with Google
          </Button>

          {feedback && (
            <Typography variant="body2" color="primary">
              {feedback}
            </Typography>
          )}
        </Stack>
      </Box>
    </Container>
  );
}
