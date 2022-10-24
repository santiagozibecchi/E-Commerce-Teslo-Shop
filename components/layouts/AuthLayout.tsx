import { FC, PropsWithChildren } from "react";
import Head from "next/head";
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
               sx={{
                  flexDirection: { xs: "column-reverse", sm: "row" },
                  height: {
                     xs: "100vh",
                     sm: "calc(100vh - 100px)",
                  },
               }}
               justifyContent="center"
               alignItems="center"
               // height="calc(100vh - 100px)"
               gap={1}
            >
               {children}
            </Box>
         </main>
      </>
   );
};
