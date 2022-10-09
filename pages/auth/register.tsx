import React, { useState } from "react";
import NextLink from "next/link";
import { useForm } from "react-hook-form";

import { AuthLayout } from "../../components/layouts";
import {
   Box,
   Button,
   Grid,
   Link,
   TextField,
   Typography,
   styled,
   Chip,
} from "@mui/material";
import styles from "./Login&Register.module.css";
import { validations } from "../../utils";
import { tesloApi } from "../../api";
import ErrorOutline from "@mui/icons-material/ErrorOutline";

const StyledTextField = styled(TextField)(({ theme }) => ({
   "& fieldset": {
      borderRadius: "20px",
      paddingLeft: theme.spacing(2.5),
   },
   "&:hover fieldset": {
      borderColor: theme.palette.secondary.main,
   },
   "& label.Mui-focused": {
      color: theme.palette.secondary.main,
   },
   "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.secondary.main,
   },
   "& .MuiOutlinedInput-root": {
      // "& fieldset": {
      //    borderColor: theme.palette.secondary.main,
      // },
      "&.Mui-focused fieldset": {
         borderColor: theme.palette.secondary.main,
      },
   },
   "& label": {
      paddingLeft: theme.spacing(2),
   },
   "& input": {
      paddingLeft: theme.spacing(3.5),
   },
}));

type FormData = {
   name: string;
   email: string;
   password: string;
};

const RegisterPage = () => {
   const [showError, setShowError] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   const onRegisterForm = async ({ name, email, password }: FormData) => {
      try {
         const { data } = await tesloApi.post("/user/register", {
            name,
            email,
            password,
         });

         const { token, user } = data;
         console.log({ token, user });
      } catch (error) {
         setShowError(true);
         console.log("Error en las credenciales");
         setTimeout(() => setShowError(false), 3000);
      }
   };

   return (
      <AuthLayout title={"Ingresar"}>
         <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
            <Box className={styles.loginForm}>
               <Box
                  sx={{
                     width: 350,
                     padding: "15px 20px",
                  }}
               >
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <Typography
                           variant="h4"
                           component="h1"
                           color="secondary"
                           fontWeight="bold"
                        >
                           Crea tu cuenta
                        </Typography>

                        <Chip
                           label="Ya se encuentra registrado"
                           color="error"
                           icon={<ErrorOutline />}
                           className="fadeIn"
                           sx={{
                              display: showError ? "flex" : "none",
                              gap: 3,
                           }}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <StyledTextField
                           autoComplete="off"
                           label="Nombre"
                           variant="outlined"
                           fullWidth
                           {...register("name", {
                              required: "El campo es obligatorio",
                              minLength: {
                                 value: 2,
                                 message: "Mínimo de 2 caracteres",
                              },
                           })}
                           error={!!errors.name}
                           helperText={errors.name?.message}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <StyledTextField
                           type="email"
                           autoComplete="off"
                           label="Correo"
                           variant="outlined"
                           fullWidth
                           {...register("email", {
                              required: "El campo es obligatorio",
                              validate: (val) => validations.isEmail(val),
                           })}
                           error={!!errors.email}
                           helperText={errors.email?.message}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <StyledTextField
                           type="password"
                           autoComplete="off"
                           label="Contraseña"
                           variant="outlined"
                           fullWidth
                           {...register("password", {
                              required: "Este campo es obligatorio",
                              minLength: {
                                 value: 6,
                                 message: "Mínimo 6 caracteres",
                              },
                           })}
                           error={!!errors.password}
                           helperText={errors.password?.message}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <Button
                           color="secondary"
                           className="circular-btn"
                           size="large"
                           fullWidth
                           type="submit"
                        >
                           Crear cuenta
                        </Button>
                     </Grid>
                     <Grid
                        item
                        xs={12}
                        display="flex"
                        justifyContent="flex-end"
                     >
                        <NextLink href="/auth/login" passHref>
                           <Link underline="always">
                              ¿Ya tienes una cuenta?
                           </Link>
                        </NextLink>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </form>

         <Box
            className={styles.loginForm}
            sx={{
               position: "absolute",
               top: 10,
               left: 10,
               padding: "5px",
               px: "10px",
            }}
         >
            <NextLink href="/" passHref>
               <Link fontSize="12px" color="white">
                  Página Principal
               </Link>
            </NextLink>
         </Box>
      </AuthLayout>
   );
};

export default RegisterPage;
