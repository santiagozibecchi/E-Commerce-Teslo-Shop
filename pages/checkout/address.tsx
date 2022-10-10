import { useRouter } from "next/router";
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
import { countries, jwt } from "../../utils";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

type FormData = {
   firstName: string;
   lastName: string;
   address: string;
   address2?: string;
   zip: string;
   city: string;
   country: string;
   phone: string;
};

const AddressPage = () => {
   const router = useRouter();

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<FormData>({
      defaultValues: {
         firstName: "",
         lastName: "",
         address: "",
         address2: "",
         zip: "",
         city: "",
         country: countries[0].code,
         phone: "",
      },
   });

   const onUserDirection = (data: FormData) => {
      Cookies.set("firstName", data.firstName);
      Cookies.set("lastName", data.lastName);
      Cookies.set("address", data.address);
      Cookies.set("address2", data.address2 || "");
      Cookies.set("zip", data.zip);
      Cookies.set("city", data.city);
      Cookies.set("country", data.country);
      Cookies.set("phone", data.phone);

      router.push("/checkout/summary");
   };

   return (
      <ShopLayout
         title="Dirección"
         pageDescription="Confirmar direccion del destino"
      >
         <form onSubmit={handleSubmit(onUserDirection)} noValidate>
            <Typography variant="h1" component="h1">
               Dirección
            </Typography>

            <Grid container spacing={2} mt={3}>
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Nombre"
                     variant="filled"
                     fullWidth
                     {...register("firstName", {
                        required: "El nombre es requerido",
                        minLength: {
                           value: 2,
                           message: "Debe de tener 2 o más caracteres",
                        },
                     })}
                     error={!!errors.firstName}
                     helperText={errors.firstName?.message}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Apellido"
                     variant="filled"
                     fullWidth
                     {...register("lastName", {
                        required: "El apellido es requerido",
                        minLength: {
                           value: 2,
                           message: "Debe de tener 2 o más caracteres",
                        },
                     })}
                     error={!!errors.lastName}
                     helperText={errors.lastName?.message}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Dirección"
                     variant="filled"
                     fullWidth
                     {...register("address", {
                        required: "La dirección es requerida",
                        minLength: {
                           value: 5,
                           message: "Debe de tener 5 o más caracteres",
                        },
                     })}
                     error={!!errors.address}
                     helperText={errors.address?.message}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Dirección 2 (opcional)"
                     variant="filled"
                     fullWidth
                     {...register("address2")}
                     error={!!errors.address2}
                     helperText={errors.address2?.message}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Código Postal"
                     variant="filled"
                     fullWidth
                     {...register("zip", {
                        required: "Debe ingresar un Código Postal",
                        minLength: {
                           value: 4,
                           message: "Debe tener 4 o más caracteres",
                        },
                     })}
                     error={!!errors.zip}
                     helperText={errors.zip?.message}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Cuidad"
                     variant="filled"
                     fullWidth
                     {...register("city", {
                        required: "La cuidad es obligatoria",
                     })}
                     error={!!errors.city}
                     helperText={errors.city?.message}
                  />
               </Grid>
               <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                     {/* <InputLabel
                        sx={{
                           backgroundColor: "#FFF",
                           padding: "5px",
                           paddingRight: "20px",
                           borderRadius: "12px",
                           color: "black",
                        }}
                     >
                        País
                     </InputLabel> */}
                     <TextField
                        select
                        defaultValue={countries[0].code}
                        variant="filled"
                        label="País"
                        {...register("country", {
                           required: "Debe ingresar su país",
                        })}
                        error={!!errors.country}
                     >
                        {countries.map((country) => (
                           <MenuItem key={country.code} value={country.code}>
                              {country.name}
                           </MenuItem>
                        ))}
                     </TextField>
                  </FormControl>
               </Grid>
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Teléfono"
                     variant="filled"
                     fullWidth
                     {...register("phone", {
                        required: "El teléfono es obligatorio",
                     })}
                     error={!!errors.phone}
                     helperText={errors.phone?.message}
                  />
               </Grid>
            </Grid>
            <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
               <Button
                  type="submit"
                  color="secondary"
                  className="circular-btns"
               >
                  Revisar pedido
               </Button>
            </Box>
         </form>
      </ShopLayout>
   );
};

// Siempre que el cliente solicite esta página se realiza una petición
// El problema empezaria cuando tendriamos muchas páginas y muchos usuarios realizando la misma peticion, deberias escribir este mismo codigo en cada una de ellas. Ademas de hacer trabajar demas al servidor cuando lo podriamos evitar.
// * Solucion: A partir de Next 12 podemos crear un middleware para verificar la autenticacion y servir la pagina de forma ESTATICA
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
