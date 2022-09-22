import NextLink from "next/link";
import {
   Box,
   Card,
   CardContent,
   Chip,
   Divider,
   Grid,
   Link,
   Typography,
} from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import {
   CreditCardOffOutlined,
   CreditScoreOutlined,
} from "@mui/icons-material";

const OrderPage = () => {
   return (
      <ShopLayout
         title="Resumen de la orden #65454315"
         pageDescription="Order: ABC123"
      >
         <Typography variant="h1" component="h1">
            Resumen de la orden
         </Typography>

         {/* <Chip
            sx={{ mt: 2 }}
            label="Pago pendiente"
            variant="outlined"
            color="error"
            icon={<CreditCardOffOutlined />}
         /> */}
         <Chip
            sx={{ mt: 2 }}
            label="Orden pagada correctamente"
            variant="outlined"
            color="success"
            icon={<CreditScoreOutlined />}
         />

         <Grid container mt={3}>
            {/* Para mostrar los productos que tenemos en el carrito */}
            <Grid item xs={12} sm={7}>
               {/* CartList */}
               <CartList />
            </Grid>
            <Grid item xs={12} sm={5}>
               <Card className="summary-card">
                  <CardContent>
                     <Typography variant="h2">Resumen (3 productos)</Typography>
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

                     <Typography>Santiago Zibecchi</Typography>
                     <Typography>Colon 5225</Typography>
                     <Typography>Goya, 3450</Typography>
                     <Typography>Argentina</Typography>
                     <Typography>+54 370 145648</Typography>

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
                        {/* TODO */}
                        <h1>Pagar</h1>

                        <Chip
                           label="Orden pagada correctamente"
                           variant="outlined"
                           color="secondary"
                           icon={<CreditScoreOutlined />}
                           sx={{
                              alignSelf: "center",
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

export default OrderPage;
