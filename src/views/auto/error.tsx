import { Box, Button, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ErrorPage: React.FC = () => {
  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack spacing={3} sx={{ alignItems: "center", maxWidth: "md" }}>
        <Box>
          <Box
            component="img"
            alt="Under development"
            src="/images/error-500.png"
            sx={{
              display: "inline-block",
              height: "auto",
              maxWidth: "100%",
              width: "400px",
            }}
          />
        </Box>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          500: Algo salió mal
        </Typography>
        <Typography
          color="text.secondary"
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          Ocurrió un error inesperado. Inténtalo de nuevo en un momento.
        </Typography>
        <Button
          LinkComponent={NavLink}
          href={"/"}
          startIcon={<ArrowBackIcon fontSize="medium" />}
          variant="contained"
        >
          Volver al inicio
        </Button>
      </Stack>
    </Box>
  );
};

export default ErrorPage;
