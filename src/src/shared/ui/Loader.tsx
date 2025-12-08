import { Box, CircularProgress, Typography } from "@mui/material";

interface LoaderProps {
  overlay?: boolean;
  title?: string;
  caption?: string;
}

const Loader: React.FC<LoaderProps> = ({ overlay, title, caption }) => {
  const styles = overlay
    ? {
        top: 0,
        left: 0,
        zIndex: 1300,
        position: "fixed",
        backgroundColor: "background.default",
      }
    : undefined;

  return (
    <Box
      display="flex"
      height="100%"
      width="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={styles}
    >
      <CircularProgress />
      {title && (
        <Typography variant="h6" style={{ marginTop: 16 }}>
          {title}
        </Typography>
      )}
      {caption && (
        <Typography variant="caption" color="textSecondary">
          {caption}
        </Typography>
      )}
    </Box>
  );
};

export default Loader;
