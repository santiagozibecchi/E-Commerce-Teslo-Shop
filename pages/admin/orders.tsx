import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined";
import React from "react";
import { AdminLayout } from "../../components/layouts/AdminLayout";

const ordersPage = () => {
   return (
      <AdminLayout
         title={"Ordenes"}
         subTitle={"Mantenimiento de ordenes"}
         icon={<ConfirmationNumberOutlined />}
      ></AdminLayout>
   );
};

export default ordersPage;
