import { useState, useEffect } from "react";
import useSWR from "swr";
import { AdminLayout } from "../../components/layouts";
import { Grid, Typography } from "@mui/material";
import SummaryTile from "../../components/admin/SummaryTile";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import {
   AccessTimeOutlined,
   AttachMoneyOutlined,
   CancelPresentationOutlined,
   CreditCardOffOutlined,
   CreditCardOutlined,
   DashboardOutlined,
   GroupOutlined,
   ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import { DashboardSummaryResponse } from "../../interfaces";

const DashBoardPage = () => {
   const { data, error } = useSWR<DashboardSummaryResponse>(
      "/api/admin/dashboard",
      {
         refreshInterval: 30 * 1000, // 30 seg
      }
   );

   const [refreshIn, setRefreshIn] = useState(30);

   useEffect(() => {
      // setInterval se ejecuta cada 30 segundos
      const interval = setInterval(() => {
         setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
      }, 1000);

      // Si me muevo a otra pagina esta funcion se seguiria ejecutando, por este motivo llamo una funcion de retorno para limpiarlo en el caso de que el efecto ya no sea necesario.
      return () => clearInterval(interval);
   }, []);

   if (!error && !data) {
      return <></>;
   }

   if (error) {
      console.log(error);
      return <Typography>Error al cargar la informacion</Typography>;
   }

   const {
      numberOfOrders,
      paidOrders,
      notPaidOrders,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
      lowInventory,
   } = data!;

   return (
      <AdminLayout
         title="DashBoard"
         subTitle="Estadisticas generales"
         icon={<DashboardOutlined />}
      >
         <Grid container spacing={2}>
            <SummaryTile
               title={numberOfOrders}
               subTitle="Ordenes Totales"
               icon={
                  <CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />
               }
            />
            <SummaryTile
               title={paidOrders}
               subTitle="Ordenes Pagadas"
               icon={
                  <AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />
               }
            />
            <SummaryTile
               title={notPaidOrders}
               subTitle="Ordenes Pendientes"
               icon={
                  <CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />
               }
            />
            <SummaryTile
               title={numberOfClients}
               subTitle="Clientes"
               icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
            />
            <SummaryTile
               title={numberOfProducts}
               subTitle="Productos"
               icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
            />
            <SummaryTile
               title={productsWithNoInventory}
               subTitle="Sin Stock"
               icon={
                  <CancelPresentationOutlined
                     color="error"
                     sx={{ fontSize: 40 }}
                  />
               }
            />
            <SummaryTile
               title={lowInventory}
               subTitle="Con poco Stock"
               icon={
                  <ProductionQuantityLimitsOutlined
                     color="warning"
                     sx={{ fontSize: 40 }}
                  />
               }
            />
            <SummaryTile
               title={refreshIn}
               subTitle="Actualización del inventario"
               icon={
                  <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />
               }
            />
         </Grid>
      </AdminLayout>
   );
};

export default DashBoardPage;
