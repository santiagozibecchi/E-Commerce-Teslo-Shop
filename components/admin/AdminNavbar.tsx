import { useContext } from "react";
import NextLink from "next/link";
import { UiContext } from "../../context";
import { AppBar, Link, Toolbar, Typography, Box, Button } from "@mui/material";

export const AdminNavbar = () => {
   const { toggleSideMenu } = useContext(UiContext);

   return (
      <AppBar>
         <Toolbar>
            <NextLink href="/" passHref>
               <Link display="flex" alignItems="center">
                  <Typography variant="h6">Teslo |</Typography>
                  <Typography sx={{ ml: 0.5 }}>Shop</Typography>
               </Link>
            </NextLink>

            <Box flex={1} />

            <Button onClick={toggleSideMenu}>Menu</Button>
         </Toolbar>
      </AppBar>
   );
};
