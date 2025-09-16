import { Box, Button, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const NotFoundPage: React.FC = () => {
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
            src="/images/error-404.png"
            sx={{
              display: "inline-block",
              height: "auto",
              maxWidth: "100%",
              width: "400px",
            }}
          />
        </Box>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          404: La página que buscas no está aquí
        </Typography>
        <Typography
          color="text.secondary"
          variant="body1"
          sx={{ textAlign: "center" }}
        >
          O bien intentaste una ruta inválida o llegaste aquí por error. En
          cualquier caso, intenta usar la navegación.
        </Typography>
        <Button
          component={NavLink}
          to={"/"}
          startIcon={<ArrowBackIcon fontSize="medium" />}
          variant="contained"
        >
          Volver al inicio
        </Button>
      </Stack>
    </Box>
  );
};

export default NotFoundPage;
