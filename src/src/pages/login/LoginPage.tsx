import { useTheme } from "../../app/providers";
import { Box, Button, TextField, Typography, Container } from "@mui/material";

export const LoginPage = () => {
  const { mode } = useTheme();
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: mode === "dark" ? "grey.900" : "grey.100",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
