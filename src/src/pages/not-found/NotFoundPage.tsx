import { useTranslation } from "react-i18next";
import { Box, Button, Typography, Container } from "@mui/material";

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {t("notFound.title")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t("notFound.message")}
        </Typography>
        <Button href="/login" variant="contained" color="primary">
          {t("notFound.backButton")}
        </Button>
      </Box>
    </Container>
  );
};
