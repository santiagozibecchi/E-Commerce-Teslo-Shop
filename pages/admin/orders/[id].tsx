import { GetServerSideProps, NextPage } from "next";

import {
   Box,
   Card,
   CardContent,
   Chip,
   Divider,
   Grid,
   Typography,
} from "@mui/material";
import { CartList, OrderSummary } from "../../../components/cart";
import { AdminLayout } from "../../../components/layouts";
import {
   AirplaneTicketOutlined,
   CreditCardOffOutlined,
   CreditScoreOutlined,
} from "@mui/icons-material";
import { dbOrders } from "../../../database";
import { IOrder } from "../../../interfaces";

interface Props {
   order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
   const { shippingAddress } = order;

   return (
      <AdminLayout
         title="Resumen de la orden"
         subTitle={`OrdenId: ${order._id}`}
         icon={<AirplaneTicketOutlined />}
      >
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

         <Grid container mt={3} className="fadeIn">
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
                     </Box>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </AdminLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({
   req,
   query,
}) => {
   const { id = "" } = query;

   const order = await dbOrders.getOrderById(id.toString());

   if (!order) {
      return {
         redirect: {
            destination: `/admin/orders`,
            permanent: false,
         },
      };
   }

   return {
      props: { order },
   };
};

export default OrderPage;
