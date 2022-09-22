import React, { FC } from "react";
import NextLink from "next/link";
import { Chip, Grid, Link, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import {
   DataGrid,
   GridColDef,
   GridRowsProp,
   GridCellParams,
} from "@mui/x-data-grid";

const columns: GridColDef[] = [
   { field: "id", headerName: "ID", width: 100 },
   { field: "fullname", headerName: "Nombre completo", width: 200 },
   {
      field: "paid",
      headerName: "Pagada",
      description: "Muestra la order fue pagada",
      width: 150,
      renderCell: (params: GridCellParams) => {
         return params.row.piad ? (
            <Chip color="success" label="Pagada" variant="outlined" />
         ) : (
            <Chip color="error" label="Pagada" variant="outlined" />
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
            <NextLink href={`/orders/${params.row.id}`} passHref>
               <Link underline="always">Ver Orden</Link>
            </NextLink>
         );
      },
   },
];

const rows: GridRowsProp = [
   { id: 1, piad: true, fullname: "Santiago Zibecchi" },
   { id: 2, piad: false, fullname: "Elias Rolon Soto" },
   { id: 3, piad: false, fullname: "Pucheta Jose" },
   { id: 4, piad: true, fullname: "Melina Vallejos" },
   { id: 5, piad: false, fullname: "Maxima Sanabria" },
   { id: 6, piad: true, fullname: "Fabio Prado" },
   { id: 7, piad: true, fullname: "Emilio Zini" },
];

const HistoryPage: FC = () => {
   return (
      <ShopLayout
         title="Historial de ordenes"
         pageDescription={"Historial de ordenes del cliente"}
      >
         <Typography variant="h1" component="h1">
            Historial de ordenes
         </Typography>
         <Grid container mt={2}>
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

export default HistoryPage;
