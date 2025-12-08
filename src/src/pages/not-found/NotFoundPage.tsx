import { useTranslation } from "react-i18next";
import { Button, Typography, Container, Paper } from "@mui/material";

export const NotFoundPage = () => {
  const { t } = useTranslation("notFound");

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          p: 4,
          boxShadow: 3,
          display: "flex",
          borderRadius: 1,
          alignItems: "stretch",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {t("title")}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {t("message")}
        </Typography>
        <Button href="/login" variant="contained" color="primary">
          {t("backButton")}
        </Button>
      </Paper>
    </Container>
  );
};
