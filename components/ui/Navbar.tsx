import NextLink from "next/link";
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
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

export const Navbar = () => {
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

            <Box>
               <NextLink href="/category/men" passHref>
                  <Link>
                     <Button>Hombres</Button>
                  </Link>
               </NextLink>

               <NextLink href="/category/women" passHref>
                  <Link>
                     <Button>Mujeres</Button>
                  </Link>
               </NextLink>

               <NextLink href="/category/kid" passHref>
                  <Link>
                     <Button>Niños</Button>
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

            <Button>Menu</Button>
         </Toolbar>
      </AppBar>
   );
};
