

import { Button, TextField, Container, Typography, Paper } from "@mui/material";
import { login } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" mb={2}>Admin Login</Typography>
        <TextField fullWidth label="Username" margin="normal" />
        <TextField fullWidth label="Password" type="password" margin="normal" />
        <Button fullWidth variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Container>
  );
}
