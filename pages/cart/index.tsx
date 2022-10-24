import { useContext, useEffect } from "react";
import {
   Box,
   Button,
   Card,
   CardContent,
   Divider,
   Grid,
   Typography,
} from "@mui/material";

import { useRouter } from "next/router";
import { CartContext } from "../../context";
import { ShopLayout } from "../../components/layouts";
import { CartList, OrderSummary } from "../../components/cart";

const CardPage = () => {
   const { isLoaded, cart } = useContext(CartContext);
   const router = useRouter();

   useEffect(() => {
      if (isLoaded && cart.length === 0) {
         router.replace("/cart/empty");
      }
   }, [isLoaded, cart, router]);

   // Evitar el renderizado del carrito al cliente
   if (!isLoaded || cart.length === 0) {
      return <></>;
   }

   return (
      <ShopLayout
         title={`Carrito - 3`}
         pageDescription={"Carrito de compra de la tienda"}
      >
         <Typography variant="h1" component="h1">
            Carrito
         </Typography>

         <Grid container mt={3}>
            {/* Para mostrar los productos que tenemos en el carrito */}
            <Grid item xs={12} sm={7}>
               {/* CartList */}
               <CartList editable />
            </Grid>
            <Grid item xs={12} sm={5}>
               <Card className="summary-card">
                  <CardContent>
                     <Typography variant="h2">Orden</Typography>
                     <Divider sx={{ my: 1 }} />
                     {/* Resumen de la order - OrdenSummary */}
                     <OrderSummary />
                     <Box sx={{ mt: 3 }}>
                        {/* En esta caso no es necesario cargarlo de ante mano */}
                        <Button
                           color="secondary"
                           className="circular-btn"
                           fullWidth
                           href="/checkout/address"
                        >
                           Checkout
                        </Button>
                     </Box>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

export default CardPage;
