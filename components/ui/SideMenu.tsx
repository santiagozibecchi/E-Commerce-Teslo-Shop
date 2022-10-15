import { useContext, useState } from "react";
import {
   Box,
   Divider,
   Drawer,
   IconButton,
   Input,
   InputAdornment,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   ListSubheader,
} from "@mui/material";
import { AuthContext, UiContext } from "../../context";
import { useRouter } from "next/router";

// Material-icons-import to evit bundler
import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined";
import EscalatorWarningOutlined from "@mui/icons-material/EscalatorWarningOutlined";
import FemaleOutlined from "@mui/icons-material/FemaleOutlined";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import MaleOutlined from "@mui/icons-material/MaleOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import VpnKeyOutlined from "@mui/icons-material/VpnKeyOutlined";

export const SideMenu = () => {
   const { toggleSideMenu, isMenuOpen } = useContext(UiContext);
   const { isLoggedIn, user, logout } = useContext(AuthContext);

   const router = useRouter();
   // Lo asocio con el value del input de busqueda
   const [searchTerm, setSearchTerm] = useState("");

   const navigateTo = (url: string) => {
      toggleSideMenu();
      router.push(url);
   };

   const onSearchTerm = () => {
      if (searchTerm.trim().length === 0) return;

      navigateTo(`/search/${searchTerm}`);
   };

   return (
      <Drawer
         open={isMenuOpen}
         onClose={toggleSideMenu}
         anchor="right"
         sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
      >
         <Box sx={{ width: 250, paddingTop: 5 }}>
            <List>
               <ListItem>
                  <Input
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
                           <IconButton onClick={onSearchTerm}>
                              <SearchOutlined />
                           </IconButton>
                        </InputAdornment>
                     }
                  />
               </ListItem>

               {isLoggedIn && (
                  <>
                     <ListItem button>
                        <ListItemIcon>
                           <AccountCircleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Perfil"} />
                     </ListItem>

                     <ListItem
                        button
                        onClick={() => navigateTo("/orders/history")}
                     >
                        <ListItemIcon>
                           <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Mis Ordenes"} />
                     </ListItem>
                  </>
               )}

               {isLoggedIn ? (
                  <ListItem button onClick={logout}>
                     <ListItemIcon>
                        <LoginOutlined />
                     </ListItemIcon>
                     <ListItemText primary={"Salir"} />
                  </ListItem>
               ) : (
                  <ListItem
                     button
                     onClick={() =>
                        // Envio un query de referecia para saber cual fue la ultima pagina donde estaba el usuario.
                        navigateTo(`/auth/login?p=${router.asPath}`)
                     }
                  >
                     <ListItemIcon>
                        <VpnKeyOutlined />
                     </ListItemIcon>
                     <ListItemText primary={"Ingresar"} />
                  </ListItem>
               )}

               <ListItem
                  onClick={() => navigateTo("/category/men")}
                  button
                  sx={{ display: { xs: "", sm: "none" } }}
               >
                  <ListItemIcon>
                     <MaleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Hombres"} />
               </ListItem>

               <ListItem
                  onClick={() => navigateTo("/category/women")}
                  button
                  sx={{ display: { xs: "", sm: "none" } }}
               >
                  <ListItemIcon>
                     <FemaleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Mujeres"} />
               </ListItem>

               <ListItem
                  onClick={() => navigateTo("/category/kid")}
                  button
                  sx={{ display: { xs: "", sm: "none" } }}
               >
                  <ListItemIcon>
                     <EscalatorWarningOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Niños"} />
               </ListItem>

               {/* Admin */}
               {user?.role === "admin" && (
                  <>
                     <Divider />
                     <ListSubheader>Admin Panel</ListSubheader>

                     <ListItem button>
                        <ListItemIcon>
                           <CategoryOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Productos"} />
                     </ListItem>
                     <ListItem button>
                        <ListItemIcon>
                           <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={"Ordenes"} />
                     </ListItem>

                     <ListItem button>
                        <ListItemIcon>
                           <AdminPanelSettings />
                        </ListItemIcon>
                        <ListItemText primary={"Usuarios"} />
                     </ListItem>
                  </>
               )}
            </List>
         </Box>
      </Drawer>
   );
};
