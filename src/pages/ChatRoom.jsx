
import { Container,
           Box,
           Typography,
           TextField,
           Stack,} from "@mui/material";

export default function ChatRoom() {
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
              <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>
                  {"Caremoms inbox"}
                </Typography>

                <Stack spacing={2} mt={2}>
          <TextField
                              label="Email"
                              fullWidth
                            />
        <TextField fullWidth label="New message" id="fullWidth" />
        </Stack>
      </Box>
       </Container>
    );
  }
