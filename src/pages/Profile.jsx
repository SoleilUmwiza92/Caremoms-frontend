import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useAuth from '../auth/useAuth';
import { updateCurrentUserProfile, getCurrentUser, saveUserProfile } from '../api/users';

export default function Profile() {
  const { backendUser, accessToken, loading: authLoading } = useAuth();

  const [user, setUser] = useState('');
  const [email, setEmail]=useState('');
  const [userName, setUserName]=useState('');
  const [userRole, setRole]=useState('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [dob, setDob] = useState('');

  // Load latest user data when component mounts / backendUser changes
  useEffect(() => {
    if (!accessToken) return;
    (async () => {
      try {
        const user = await getCurrentUser(accessToken);
        setUser(user || '');
        setEmail(user.email || '');
        setUserName(user.userName || '');
        setRole(user.role || 'Regular');
      } catch (err) {
        console.error('Failed to load user for profile:', err);
      }
    })();
  }, [accessToken]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setFeedback('');
      user.role =userRole;
      user.dob=dob;
      console.log("User set "+ JSON.stringify(user));
      let data = user;
      if(user.id == null){
          await saveUserProfile(data, accessToken);
      }else{
          await updateCurrentUserProfile(data, accessToken);
      }
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
          {userName +"'s profile"}
        </Typography>

        <Stack spacing={2} mt={2}>
          <TextField
            label="Email"
            value={email}
            disabled
            fullWidth
          />

          <TextField
            defaultValue={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
          />

          <TextField
                      label="Role"
                      value={userRole}
                      disabled
                      fullWidth
                    />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                label="Date of Birth"
                onChange={(date) => {
                    const d = new Date(date).toLocaleDateString('en-EN');
                    console.log("date " + d);
                    setDob(d);
                    }}/>

          </LocalizationProvider>

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
