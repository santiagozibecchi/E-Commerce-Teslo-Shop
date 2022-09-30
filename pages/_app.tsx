import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SWRConfig } from "swr";
import { lightTheme } from "../themes";
import { UiProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <SWRConfig
         value={{
            // refreshInterval: 3000,
            fetcher: (resource, init) =>
               fetch(resource, init).then((res) => res.json()),
         }}
      >
         <UiProvider>
            <ThemeProvider theme={lightTheme}>
               <CssBaseline />
               <Component {...pageProps} />
            </ThemeProvider>
         </UiProvider>
      </SWRConfig>
   );
}

export default MyApp;
