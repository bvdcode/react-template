import { Box, CircularProgress, Typography } from "@mui/material";

interface LoaderProps {
  overlay?: boolean;
  title?: string;
  caption?: string;
}

const Loader: React.FC<LoaderProps> = ({ overlay, title, caption }) => {
  return (
    <Box
      display="flex"
      height="100%"
      width="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        top: 0,
        left: 0,
        zIndex: 1300,
        transition: "background-color 0.3s ease",
        backgroundColor: "background.default",
        position: overlay ? "fixed" : "static",
      }}
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
