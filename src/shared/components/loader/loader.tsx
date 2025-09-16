// src/components/Loader.tsx
import * as React from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";

type LoaderTypes = "inline" | "fullscreen" | "overlay" | "topBar";

interface LoaderProps {
  type?: LoaderTypes;
  label?: string;
}

const Loader: React.FC<LoaderProps> = ({ type = "inline", label }) => {
  if (type === "topBar") {
    return (
      <LinearProgress
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (t) => t.zIndex.appBar + 1,
        }}
      />
    );
  }

  if (type === "fullscreen") {
    return (
      <Box
        sx={{
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          gap: 1.5,
        }}
      >
        <CircularProgress />
        {label && <Typography variant="body2">{label}</Typography>}
      </Box>
    );
  }

  if (type === "overlay") {
    return (
      <Backdrop
        open
        sx={{
          color: "#fff",
          zIndex: (t) => t.zIndex.modal + 1,
          display: "grid",
          placeItems: "center",
          gap: 1.5,
        }}
      >
        <CircularProgress color="inherit" />
        {label && <Typography variant="body2">{label}</Typography>}
      </Backdrop>
    );
  }

  // inline
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
      <CircularProgress size={20} />
      {label && <Typography variant="body2">{label}</Typography>}
    </Box>
  );
};

export default Loader;
