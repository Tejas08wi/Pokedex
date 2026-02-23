import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider, createTheme, Container } from "@mui/material";
import { trpc, createTRPCClientConfig } from "../src/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2"
    },
    secondary: {
      main: "#ff9800"
    }
  }
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient(createTRPCClientConfig())
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="md" sx={{ my: 4 }}>
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default MyApp;