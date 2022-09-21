import {
   Box,
   Button,
   Card,
   CardContent,
   Divider,
   Grid,
   Typography,
} from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";

const CardPage = () => {
   return (
      <ShopLayout
         title={`Carrito - 3`}
         pageDescription={"Carrito de compra de la tienda"}
      >
         <Typography variant="h1" component="h1">Carrito</Typography>

         <Grid container>
            {/* Para mostrar los productos que tenemos en el carrito */}
            <Grid item xs={12} sm={7}>
               {/* CartList */}
               <CartList />
            </Grid>
            <Grid item xs={12} sm={5}>
               <Card className="summary-card">
                  <CardContent>
                     <Typography variant="h2">Orden</Typography>
                     <Divider sx={{ my: 1 }} />
                     {/* Resumen de la order - OrdenSummary */}
                     <OrderSummary />
                     <Box sx={{ mt: 3 }}>
                        <Button
                           color="secondary"
                           className="circular-btn"
                           fullWidth
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
