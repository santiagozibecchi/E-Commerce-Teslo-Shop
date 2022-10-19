import { PeopleOutline } from "@mui/icons-material";
import { AdminLayout } from "../../components/layouts";

const UsersPage = () => {
   return (
      <AdminLayout
         title={"Usuarios"}
         subTitle={"Mantenimiento de usuarios"}
         icon={<PeopleOutline />}
      ></AdminLayout>
   );
};

export default UsersPage;
