import { useTheme } from "../../app/providers";
import { Box, Button, Typography, Container } from "@mui/material";

export const NotFoundPage = () => {
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
          404 - Page Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          The page you are looking for does not exist.
        </Typography>
        <Button href="/login" variant="contained" color="primary">
          Go to Login Page
        </Button>
      </Box>
    </Container>
  );
};
