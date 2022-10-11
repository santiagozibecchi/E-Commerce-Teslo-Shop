import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SWRConfig } from "swr";
import { lightTheme } from "../themes";
import { AuthProvider, CartProvider, UiProvider } from "../context";

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <SessionProvider>
         <SWRConfig
            value={{
               // refreshInterval: 3000,
               fetcher: (resource, init) =>
                  fetch(resource, init).then((res) => res.json()),
            }}
         >
            <AuthProvider>
               <CartProvider>
                  <UiProvider>
                     <ThemeProvider theme={lightTheme}>
                        <CssBaseline />
                        <Component {...pageProps} />
                     </ThemeProvider>
                  </UiProvider>
               </CartProvider>
            </AuthProvider>
         </SWRConfig>
      </SessionProvider>
   );
}

export default MyApp;
