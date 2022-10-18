import { DashboardOutlined } from "@mui/icons-material";
import React from "react";
import { AdminLayout } from "../../components/layouts";

const DashBoardPage = () => {
   return (
      <AdminLayout
         title="DashBoard"
         subTitle="Estadisticas generales"
         icon={<DashboardOutlined />}
      >
         <h3>Hola xd</h3>
      </AdminLayout>
   );
};

export default DashBoardPage;
