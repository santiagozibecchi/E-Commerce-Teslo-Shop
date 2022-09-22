import Head from "next/head";
import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";
import styles from "./AuthLayout.module.css";

interface Props {
   title: string;
}

export const AuthLayout: FC<PropsWithChildren<Props>> = ({
   children,
   title,
}) => {
   return (
      <>
         <Head>
            <title>{title}</title>
         </Head>

         <main className={styles.authLayout}>
            <Box
               display="flex"
               justifyContent="center"
               alignItems="center"
               height="calc(100vh - 100px)"
            >
               {children}
            </Box>
         </main>
      </>
   );
};
