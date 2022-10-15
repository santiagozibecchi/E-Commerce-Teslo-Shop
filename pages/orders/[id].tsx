import { GetServerSideProps, NextPage } from "next";
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
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";

interface Props {
   order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
   const { shippingAddress } = order;

   return (
      <ShopLayout title="Resumen de la orden" pageDescription="Order: ABC123">
         <Typography variant="h1" component="h1">
            Resumen de la orden {order._id}
         </Typography>

         {order.isPaid ? (
            <Chip
               sx={{ mt: 2 }}
               label="Orden pagada correctamente"
               variant="outlined"
               color="success"
               icon={<CreditScoreOutlined />}
            />
         ) : (
            <Chip
               sx={{ mt: 2 }}
               label="Pago pendiente"
               variant="outlined"
               color="error"
               icon={<CreditCardOffOutlined />}
            />
         )}

         <Grid container mt={3}>
            {/* Para mostrar los productos que tenemos en el carrito */}
            <Grid item xs={12} sm={7}>
               {/* Lista de los productos */}
               <CartList products={order.orderItems} />
            </Grid>
            <Grid item xs={12} sm={5}>
               <Card className="summary-card">
                  <CardContent>
                     <Typography variant="h2">
                        Resumen ( {order.numberOfItems}
                        {order.numberOfItems > 1 ? " productos" : " producto"} )
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
                     </Box>

                     <Typography>
                        {shippingAddress.firstName} {shippingAddress.lastName}
                     </Typography>
                     <Typography>
                        {shippingAddress.address}{" "}
                        {shippingAddress.address2
                           ? `, ${shippingAddress.address2}`
                           : ""}
                     </Typography>
                     <Typography>
                        {shippingAddress.city}, {shippingAddress.zip}
                     </Typography>
                     <Typography>{shippingAddress.country}</Typography>
                     <Typography>{shippingAddress.phone}</Typography>

                     <Divider sx={{ my: 1 }} />

                     {/* Resumen de la order - OrdenSummary */}
                     <OrderSummary
                        orderValues={{
                           numberOfItems: order.numberOfItems,
                           subTotal: order.subTotal,
                           total: order.total,
                           tax: order.tax,
                        }}
                     />

                     <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                        {/* TODO */}
                        {order.isPaid ? (
                           <Chip
                              label="Orden pagada correctamente"
                              variant="outlined"
                              color="secondary"
                              icon={<CreditScoreOutlined />}
                              sx={{
                                 alignSelf: "center",
                              }}
                           />
                        ) : (
                           <h1>Pagar</h1>
                        )}
                     </Box>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({
   req,
   query,
}) => {
   const { id = "" } = query;
   console.log(id);

   // * Identifico el usuario logeado
   const session: any = await getSession({ req });

   if (!session) {
      return {
         // Puede que la sesion expiro y entonces lo mandamos al login
         redirect: {
            destination: `/auth/login?p=/orders/${id}`,
            permanent: false,
         },
      };
   }

   // Obtengo la orden en base al id del producto
   const order = await dbOrders.getOrderById(id.toString());

   if (!order) {
      return {
         redirect: {
            destination: `/orders/history`,
            permanent: false,
         },
      };
   }

   // * Comprobar que el id de la orden sea del usuario logeado
   // El order.user es solamente el id porque no lo estoy populando
   // si esto sucede significa que un usuario "x" quiere ver la orden de otro usuario, esto no lo vamos a permitir.
   if (order.user !== session.user._id) {
      return {
         redirect: {
            destination: `/orders/history`,
            permanent: false,
         },
      };
   }

   return {
      props: { order },
   };
};

export default OrderPage;
