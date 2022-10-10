import { GetServerSideProps } from "next";

import {
   Typography,
   Grid,
   TextField,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   Box,
   Button,
} from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { jwt } from "../../utils";

const AddressPage = () => {
   return (
      <ShopLayout
         title="Dirección"
         pageDescription="Confirmar direccion del destino"
      >
         <Typography variant="h1" component="h1">
            Dirección
         </Typography>

         <Grid container spacing={2} mt={3}>
            <Grid item xs={12} sm={6}>
               <TextField label="Nombre" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField label="Apellido" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField label="Dirección" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField
                  label="Dirección 2 (opcional)"
                  variant="filled"
                  fullWidth
               />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField label="Códig Postal" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField label="Cuidad" variant="filled" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
               <FormControl fullWidth>
                  <InputLabel
                     sx={{
                        backgroundColor: "#FFF",
                        padding: "5px",
                        paddingRight: "20px",
                        borderRadius: "12px",
                        color: "black",
                     }}
                  >
                     País
                  </InputLabel>
                  <Select variant="filled" label="País" value={1}>
                     <MenuItem value={1}>Argentina</MenuItem>
                     <MenuItem value={2}>Uruguay</MenuItem>
                     <MenuItem value={3}>Paraguay</MenuItem>
                     <MenuItem value={4}>Costa Rica</MenuItem>
                  </Select>
               </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField label="Teléfono" variant="filled" fullWidth />
            </Grid>
         </Grid>

         <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
            <Button color="secondary" className="circular-btns">
               Revisar pedido
            </Button>
         </Box>
      </ShopLayout>
   );
};

// Siempre que el cliente haga una request
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
   // Se ejecuta antes de renderizar la pagina

   // Recordar que las cookies viajan por request-Time, por las peticiones
   const { token = "" } = req.cookies;

   let isValidToken = false;

   try {
      // tenomos token válido
      await jwt.isValidToken(token);
      isValidToken = true;
   } catch (error) {
      isValidToken = false;
   }

   if (!isValidToken) {
      return {
         redirect: {
            permanent: false,
            destination: "/auth/login?p=/checkout/address",
         },
      };
   }

   return {
      props: {},
   };
};

export default AddressPage;
