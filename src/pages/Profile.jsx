import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import useAuth from '../auth/useAuth';
import { updateCurrentUserProfile, getCurrentUser } from '../api/users';

export default function Profile() {
  const { backendUser, accessToken, loading: authLoading } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Load latest user data when component mounts / backendUser changes
  useEffect(() => {
    if (!accessToken) return;

    (async () => {
      try {
        const user = await getCurrentUser(accessToken);
        setDisplayName(user.displayName || '');
        setEmail(user.email || '');
      } catch (err) {
        console.error('Failed to load user for profile:', err);
      }
    })();
  }, [accessToken]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setFeedback('');
      await updateCurrentUserProfile({ displayName }, accessToken);
      setFeedback('Profile updated successfully.');
    } catch (err) {
      console.error(err);
      setFeedback('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!backendUser) {
    return <div>You must be logged in to view your profile.</div>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          My Profile
        </Typography>

        <Stack spacing={2} mt={2}>
          <TextField
            label="Email"
            value={email}
            disabled
            fullWidth
          />

          <TextField
            label="Display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save changes'}
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
