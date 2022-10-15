import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
   Box,
   Button,
   Card,
   CardContent,
   Chip,
   Divider,
   Grid,
   Link,
   Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { CartContext } from "../../context";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { countries } from "../../utils";

const SummaryPage = () => {
   const { shippingAddress, numberOfItems, createOrder } =
      useContext(CartContext);

   const router = useRouter();

   const [isPosting, setIsPosting] = useState(false);
   const [errorMessage, setErrorMessage] = useState("");

   // Al hacer uso del useEffect es el cliente el que trabaja. (el servidor tambien lo podria hacer pero en este caso lo evitamos para no hacer uso de el todas las veces)
   useEffect(() => {
      // Si no tenemos las cookies redireccionamos a la persona porque primero debe cargar el formulario con todos sus datos
      if (!Cookies.get("firstName")) {
         router.push("/checkout/address");
      }
   }, [router]);

   if (!shippingAddress) {
      return <></>;
   }

   const { address, city, country, phone, firstName, lastName, zip, address2 } =
      shippingAddress;

   const onCreateOrder = async () => {
      setIsPosting(true);
      // * Depende del resultado será redirigido o no
      const { hasError, message } = await createOrder();

      if (hasError) {
         setIsPosting(false);
         setErrorMessage(message);
         return;
      }

      // replace => para que la persona no pueda volver a regresar atras
      router.replace(`/orders/${message}`);
   };

   return (
      <ShopLayout
         title="Resumen de la orden"
         pageDescription="Resumen de la orden"
      >
         <Typography variant="h1" component="h1">
            Resumen de la orden
         </Typography>

         <Grid container mt={3}>
            {/* Para mostrar los productos que tenemos en el carrito */}
            <Grid item xs={12} sm={7}>
               {/* CartList */}
               <CartList />
            </Grid>
            <Grid item xs={12} sm={5}>
               <Card className="summary-card">
                  <CardContent>
                     <Typography variant="h2">
                        Resumen{" "}
                        {`(${
                           numberOfItems == 1
                              ? `${numberOfItems} producto`
                              : `${numberOfItems} productos`
                        })`}
                     </Typography>
                     <Divider sx={{ my: 1 }} />

                     <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                     >
                        <Typography fontWeight="bold">
                           Direccion de entrega
                        </Typography>
                        <NextLink href="/checkout/address" passHref>
                           <Link
                              underline="always"
                              sx={{ fontSize: { xs: "14px", sm: "16px" } }}
                           >
                              Editar
                           </Link>
                        </NextLink>
                     </Box>

                     <Typography>{firstName + " " + lastName}</Typography>
                     <Typography>
                        {address}
                        {address2 ? `,${address2}` : ""}
                     </Typography>
                     <Typography>
                        {city}, {zip}
                     </Typography>
                     <Typography>
                        {countries.find((c) => c.code === country)?.name}
                     </Typography>
                     <Typography>{phone}</Typography>

                     <Divider sx={{ my: 1 }} />

                     <Box display="flex" justifyContent="flex-end">
                        <NextLink href="/cart" passHref>
                           <Link
                              underline="always"
                              sx={{ fontSize: { xs: "14px", sm: "16px" } }}
                           >
                              Modificar Compra
                           </Link>
                        </NextLink>
                     </Box>

                     {/* Resumen de la order - OrdenSummary */}
                     <OrderSummary />
                     <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                        <Button
                           disabled={isPosting}
                           color="secondary"
                           className="circular-btn"
                           fullWidth
                           onClick={onCreateOrder}
                        >
                           Comfirmar Order
                        </Button>

                        <Chip
                           color="error"
                           label={errorMessage}
                           // Un string vacio es considerado como falso
                           sx={{
                              mt: 2,
                              display: errorMessage ? "flex" : "none",
                           }}
                        />
                     </Box>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

export default SummaryPage;
