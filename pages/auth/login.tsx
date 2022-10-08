import React from "react";
import NextLink from "next/link";
import { AuthLayout } from "../../components/layouts";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
// import ManOutlinedIcon from "@mui/icons-material/ManOutlined";
// import Woman2OutlinedIcon from "@mui/icons-material/Woman2Outlined";
// import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import styles from "./Login&Register.module.css";
import { validations } from "../../utils";

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
   "& .MuiInputBase-input": {
      borderRadius: 20,
      // backgroundColor: "transparent",
   },
}));

type FormData = {
   email: string;
   password: string;
};

const LoginPage = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();
   console.log({ errors });

   const onLoginUser = (data: FormData) => {
      console.log({ data });
   };

   return (
      <AuthLayout title={"Ingresar"}>
         <form onSubmit={handleSubmit(onLoginUser)} noValidate>
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
                           Iniciar Sesión
                        </Typography>
                     </Grid>
                     <Grid item xs={12}>
                        <StyledTextField
                           // Solucion momentanea al bg
                           autoComplete="off"
                           type="email"
                           label="Correo"
                           variant="outlined"
                           fullWidth
                           {...register("email", {
                              required: "Esta campo es requerido",
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
                              required: "Esta campo es requerido",
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
                           Ingresar
                        </Button>
                     </Grid>
                     <Grid
                        item
                        xs={12}
                        display="flex"
                        justifyContent="flex-end"
                     >
                        <NextLink href="/auth/register" passHref>
                           <Link underline="always">¿No tienes cuenta?</Link>
                        </NextLink>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </form>
         <Box
            className={styles.imageRight}
            display="flex"
            flexDirection="column"
            gap={2}
         >
            <Typography
               mb={2}
               fontSize="40px"
               fontWeight="bold"
               color="secondary"
            >
               ROPAS
            </Typography>
            <NextLink href="/" passHref>
               <Link
                  underline="always"
                  fontWeight="bold"
                  variant="subtitle1"
                  color="secondary"
               >
                  Hombres
               </Link>
            </NextLink>
            <NextLink href="/" passHref>
               <Link
                  underline="always"
                  fontWeight="bold"
                  variant="subtitle1"
                  color="secondary"
               >
                  Mujeres
               </Link>
            </NextLink>
            <NextLink href="/" passHref>
               <Link
                  underline="always"
                  fontWeight="bold"
                  variant="subtitle1"
                  color="secondary"
               >
                  Niños
               </Link>
            </NextLink>
         </Box>
      </AuthLayout>
   );
};

export default LoginPage;
