import { AdminLayout } from "../../components/layouts";
import { Grid } from "@mui/material";
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

const DashBoardPage = () => {
   return (
      <AdminLayout
         title="DashBoard"
         subTitle="Estadisticas generales"
         icon={<DashboardOutlined />}
      >
         <Grid container spacing={2}>
            <SummaryTile
               title={1}
               subTitle="Ordenes Totales"
               icon={
                  <CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />
               }
            />
            <SummaryTile
               title={2}
               subTitle="Ordenes Pagadas"
               icon={
                  <AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />
               }
            />
            <SummaryTile
               title={2}
               subTitle="Ordenes Pendientes"
               icon={
                  <CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />
               }
            />
            <SummaryTile
               title={2}
               subTitle="Clientes"
               icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
            />
            <SummaryTile
               title={4}
               subTitle="Productos"
               icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
            />
            <SummaryTile
               title={4}
               subTitle="Sin Stock"
               icon={
                  <CancelPresentationOutlined
                     color="error"
                     sx={{ fontSize: 40 }}
                  />
               }
            />
            <SummaryTile
               title={4}
               subTitle="Con poco Stock"
               icon={
                  <ProductionQuantityLimitsOutlined
                     color="warning"
                     sx={{ fontSize: 40 }}
                  />
               }
            />
            <SummaryTile
               title={30}
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
