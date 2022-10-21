import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import NextLink from "next/link";
import { getSession, signIn, getProviders } from "next-auth/react";
import { useRouter } from "next/router";
import { AuthLayout } from "../../components/layouts";
import { useForm } from "react-hook-form";
import {
   Box,
   Button,
   Chip,
   Divider,
   Grid,
   Link,
   TextField,
   Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import styles from "./Login&Register.module.css";
import { validations } from "../../utils";

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
   const router = useRouter();
   // const destination = router.query.p?.toString() || "/";
   // console.log(destination);
   // const { loginUser } = useContext(AuthContext);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   const [showError, setShowError] = useState(false);

   const [providers, setProviders] = useState<any>({});

   useEffect(() => {
      getProviders().then((prov) => {
         setProviders(prov);
      });
   }, []);

   const onLoginUser = async ({ email, password }: FormData) => {
      setShowError(false);

      await signIn("credentials", {
         email,
         password,
         // callbackUrl: `${window.location.origin}/${destination}`,
      });
      // Con autenticacion personalizada
      // const isValidLogin = await loginUser(email, password);

      // if (!isValidLogin) {
      //    setShowError(true);
      //    setTimeout(() => setShowError(false), 3000);
      //    return;
      // }

      // // navegar a la pantalla que el usuario estaba anteriormente y si no estaba en ningun lugar, dejarlo en el home
      // const destination = router.query.p?.toString() || "/";
      // router.replace(destination);
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
                        <Chip
                           label="Usuario o contraseña incorrecto"
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
                        <NextLink
                           href={
                              // Condicion porq podria venir undefined
                              router.query.p
                                 ? `/auth/register?p=${router.query.p}`
                                 : `/auth/register`
                           }
                           passHref
                        >
                           <Link underline="always">¿No tienes cuenta?</Link>
                        </NextLink>
                     </Grid>
                     <Grid
                        item
                        xs={12}
                        display="flex"
                        flexDirection="column"
                        justifyContent="end"
                     >
                        <Divider sx={{ width: "100%", mb: 2 }} />
                        {Object.values(providers).map((provider: any) => {
                           if (provider.id === "credentials") {
                              return <div key="credentials"></div>;
                           }

                           return (
                              <Button
                                 key={provider.id}
                                 variant="outlined"
                                 fullWidth
                                 color="primary"
                                 sx={{ mb: 1 }}
                                 onClick={() => signIn(provider.id)}
                              >
                                 {provider.name}
                              </Button>
                           );
                        })}
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

// * Verifico el token del lado del servidor para saber si inicio sesion
// ? Lo redirecciono a la pagina donde se encontraba anteriormente
// : Muestro la pagina del login

// cuando inicia sesion por primera vez, el backend esta pendiente de las cookies y lo redireccionara hacia donde estuvo la ultima vez gracias a el middleware
export const getServerSideProps: GetServerSideProps = async ({
   req,
   query,
}) => {
   const session = await getSession({ req });
   // El query p, para recuperar la ultima pagina que la persona visito.
   const { callbackUrl = "/" } = query;
   console.log(callbackUrl);

   if (session) {
      return {
         redirect: {
            destination: callbackUrl.toString(),
            permanent: false,
         },
      };
   }

   return {
      props: {},
   };
};

export default LoginPage;

// http://localhost:3000/auth/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fcheckout%2Faddress
