import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";

import {
   Box,
   Card,
   CardContent,
   Chip,
   CircularProgress,
   Divider,
   Grid,
   Link,
   Typography,
} from "@mui/material";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts";
import { PayPalButtons } from "@paypal/react-paypal-js";

import CreditCardOffOutlined from "@mui/icons-material/CreditCardOffOutlined";
import CreditScoreOutlined from "@mui/icons-material/CreditScoreOutlined";

import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces";
import { tesloApi } from "../../api";
import { useRouter } from "next/router";

type OrderResponseBody = {
   id: string;
   status:
      | "COMPLETED"
      | "SAVED"
      | "APPROVED"
      | "VOIDED"
      | "COMPLETED"
      | "PAYER_ACTION_REQUIRED";
};

interface Props {
   order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
   const router = useRouter();

   const { shippingAddress } = order;

   const [isPaying, setisPaying] = useState(false);

   const onOrderCompleted = async (details: OrderResponseBody) => {
      if (details.status !== "COMPLETED") {
         return alert("No hay pago en Paypal");
      }
      setisPaying(true);

      try {
         const { data } = await tesloApi.post(`/orders/pay`, {
            transactionId: details.id,
            orderId: order._id,
         });

         // * Al recargar la pagina vuelve a hacer la peticion al backend, y nuestro backend va a asegurarse de que todo este bien y regresará la orden pagada

         router.reload();
      } catch (error) {
         setisPaying(false);
         console.log(error);
         alert("Error");
      }
   };

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
                        {/* TODO */}

                        <Box
                           display="flex"
                           justifyContent="center"
                           className="fadeIn"
                           sx={{
                              display: isPaying ? "flex" : "none",
                           }}
                        >
                           <CircularProgress />
                        </Box>

                        <Box
                           flexDirection="column"
                           sx={{
                              display: isPaying ? "none" : "flex",
                              flex: 1,
                           }}
                        >
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
                              <PayPalButtons
                                 createOrder={(data, actions) => {
                                    return actions.order.create({
                                       purchase_units: [
                                          {
                                             amount: {
                                                value: `${order.total}`,
                                             },
                                          },
                                       ],
                                    });
                                 }}
                                 onApprove={(data, actions) => {
                                    return actions
                                       .order!.capture()
                                       .then((details) => {
                                          onOrderCompleted(details);
                                          // console.log({ details });
                                          // const name =
                                          //    details.payer.name!.given_name;
                                          // alert(
                                          //    `Transaction completed by ${name}`
                                          // );
                                       });
                                 }}
                              />
                           )}
                        </Box>
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
   // console.log(id);

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
   // Con las validaciones necesarias dentro de esta funcion
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
