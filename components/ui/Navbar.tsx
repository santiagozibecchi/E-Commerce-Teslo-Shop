import { useContext, useState } from "react";
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
   Input,
   InputAdornment,
} from "@mui/material";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import ClearOutlined from "@mui/icons-material/ClearOutlined";

export const Navbar = () => {
   const { asPath, push } = useRouter();
   const activeLink = asPath;

   const [searchTerm, setSearchTerm] = useState("");
   const [isSearchVisible, setIsSearchVisible] = useState(false);
   const { toggleSideMenu } = useContext(UiContext);

   const onSearchTerm = () => {
      if (searchTerm.trim().length === 0) return;
      push(`/search/${searchTerm}`);
   };

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
            <Box
               sx={{
                  display: isSearchVisible
                     ? "none"
                     : { xs: "none", sm: "block" },
               }}
               className="fadeIn"
            >
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

            {/* Desktop - Pantallas grandes */}

            {isSearchVisible ? (
               <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                  <Input
                     className="fadeIn"
                     autoFocus
                     value={searchTerm}
                     onKeyPress={(e) =>
                        e.key === "Enter" ? onSearchTerm() : null
                     }
                     type="text"
                     onChange={(e) => setSearchTerm(e.target.value)}
                     placeholder="Buscar..."
                     endAdornment={
                        <InputAdornment position="end">
                           <IconButton
                              onClick={() =>
                                 setIsSearchVisible(!isSearchVisible)
                              }
                           >
                              <ClearOutlined />
                           </IconButton>
                        </InputAdornment>
                     }
                  />
               </Box>
            ) : (
               <IconButton
                  sx={{ display: { xs: "none", sm: "flex" } }}
                  className="fadeIn"
                  onClick={() => setIsSearchVisible(!isSearchVisible)}
               >
                  <SearchOutlined />
               </IconButton>
            )}

            {/* Pantallas pequeñas */}
            <IconButton
               sx={{ display: { xs: "flex", sm: "none" } }}
               onClick={toggleSideMenu}
            >
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
