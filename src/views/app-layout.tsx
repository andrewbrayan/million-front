import { createTheme, ThemeProvider } from "@mui/material/styles";
import { env } from "@core/config/env";
import { Fragment } from "react";
import { InitColorSchemeScript } from "@mui/material";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { setEnvironments } from "@core/store/actions/environments.action";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "@shared/components/footer/footer";
import Header from "@shared/components/header/header";
import useTitleManager from "@shared/hooks/use-title-manager";

const AppLayout: React.FC = () => {
  const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: "class",
    },
    colorSchemes: {
      light: true,
      dark: true,
    },
  });
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  setEnvironments(env);
  useTitleManager();

  return (
    <Fragment>
      <InitColorSchemeScript defaultMode="system" />
      <ThemeProvider
        theme={theme}
        defaultMode="system"
        disableTransitionOnChange
        noSsr
      >
        <CssBaseline enableColorScheme />
        <QueryClientProvider client={queryClient}>
          <Header />
          <Outlet />
          <Footer />
        </QueryClientProvider>
        <ScrollRestoration />
      </ThemeProvider>
    </Fragment>
  );
};

export default AppLayout;
