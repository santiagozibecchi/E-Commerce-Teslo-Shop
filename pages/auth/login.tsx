import React from "react";
import NextLink from "next/link";
import { AuthLayout } from "../../components/layouts";
import {
   Box,
   Button,
   Grid,
   Link,
   TextField,
   Typography,
   styled,
} from "@mui/material";
import ManOutlinedIcon from "@mui/icons-material/ManOutlined";
import Woman2OutlinedIcon from "@mui/icons-material/Woman2Outlined";
import ChildCareOutlinedIcon from "@mui/icons-material/ChildCareOutlined";
import styles from "./Login&Register.module.css";

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

const LoginPage = () => {
   return (
      <AuthLayout title={"Ingresar"}>
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
                        label="Correo"
                        variant="outlined"
                        fullWidth
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <StyledTextField
                        label="Contraseña"
                        variant="outlined"
                        fullWidth
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <Button
                        color="secondary"
                        className="circular-btn"
                        size="large"
                        fullWidth
                     >
                        Ingresar
                     </Button>
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                     <NextLink href="/auth/register" passHref>
                        <Link underline="always">¿No tienes cuenta?</Link>
                     </NextLink>
                  </Grid>
               </Grid>
            </Box>
         </Box>
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
