import { useContext } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { UiContext } from "../../context";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
   AppBar,
   Link,
   Toolbar,
   Typography,
   Box,
   Button,
   IconButton,
   Badge,
} from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

export const Navbar = () => {
   const router = useRouter();
   const activeLink = router.asPath;

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

            {/* sx tmb nos permite agregar estilos condicionales */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
               <NextLink href="/category/men" passHref>
                  <Link>
                     <Button
                        color={
                           activeLink === "/category/men" ? "primary" : "info"
                        }
                     >
                        Hombres
                     </Button>
                  </Link>
               </NextLink>

               <NextLink href="/category/women" passHref>
                  <Link>
                     <Button
                        color={
                           activeLink === "/category/women" ? "primary" : "info"
                        }
                     >
                        Mujeres
                     </Button>
                  </Link>
               </NextLink>

               <NextLink href="/category/kid" passHref>
                  <Link>
                     <Button
                        color={
                           activeLink === "/category/kid" ? "primary" : "info"
                        }
                     >
                        Niños
                     </Button>
                  </Link>
               </NextLink>
            </Box>

            <Box flex={1} />

            <IconButton>
               <SearchOutlined />
            </IconButton>

            <NextLink href="/cart" passHref>
               <Link>
                  <IconButton>
                     <Badge badgeContent={2} color="secondary">
                        <ShoppingCartOutlinedIcon />
                     </Badge>
                  </IconButton>
               </Link>
            </NextLink>

            <Button onClick={toggleSideMenu}>Menu</Button>
         </Toolbar>
      </AppBar>
   );
};
