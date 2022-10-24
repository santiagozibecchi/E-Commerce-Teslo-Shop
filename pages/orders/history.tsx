import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { getSession } from "next-auth/react";

import {
   DataGrid,
   GridColDef,
   GridRowsProp,
   GridCellParams,
} from "@mui/x-data-grid";

import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces/order";

const columns: GridColDef[] = [
   { field: "id", headerName: "ID", width: 100 },
   { field: "fullname", headerName: "Nombre completo", width: 300 },
   {
      field: "paid",
      headerName: "Pagada",
      description: "Muestra la order fue pagada",
      width: 150,
      renderCell: (params: GridCellParams) => {
         return params.row.piad ? (
            <Chip color="success" label="Pagada" variant="outlined" />
         ) : (
            <Chip color="error" label="No Pagada" variant="outlined" />
         );
      },
   },
   {
      field: "Orden",
      headerName: "Ver orden",
      description: "Muestra la order fue pagada",
      width: 150,
      //   Para evitar el orden ya que no lo necesitamos
      sortable: false,
      renderCell: (params: GridCellParams) => {
         return (
            <NextLink href={`/orders/${params.row.orderId}`} passHref>
               <Link underline="always">Ver Orden</Link>
            </NextLink>
         );
      },
   },
];

// const rows: GridRowsProp = [
//    { id: 1, piad: true, fullname: "Santiago Zibecchi" },
//    { id: 2, piad: false, fullname: "Elias Rolon Soto" },
//    { id: 3, piad: false, fullname: "Pucheta Jose" },
//    { id: 4, piad: true, fullname: "Melina Vallejos" },
//    { id: 5, piad: false, fullname: "Maxima Sanabria" },
//    { id: 6, piad: true, fullname: "Fabio Prado" },
//    { id: 7, piad: true, fullname: "Emilio Zini" },
// ];

interface Props {
   orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
   const rows = orders.map((order, i) => ({
      id: i + 1,
      paid: order.isPaid,
      fullname:
         order.shippingAddress.firstName + order.shippingAddress.lastName,
      orderId: order._id,
   }));

   return (
      <ShopLayout
         title="Historial de ordenes"
         pageDescription={"Historial de ordenes del cliente"}
      >
         <Typography variant="h1" component="h1">
            Historial de ordenes
         </Typography>
         <Grid container mt={2} className="fadeIn">
            <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
               <DataGrid
                  columns={columns}
                  rows={rows}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
               />
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
   const session: any = await getSession({ req });

   console.log(session);
   if (!session) {
      return {
         redirect: {
            destination: "/auth/login?p=orders/history",
            permanent: false,
         },
      };
   }

   // Con el id del usuario voy a ir a la base de datos y buscar todas las ordenes que coincidan con ese id.
   const orders = await dbOrders.getOrdersByUser(session.user._id);

   return {
      props: {
         orders,
      },
   };
};

export default HistoryPage;
