import { PeopleOutline } from "@mui/icons-material";
import { AdminLayout } from "../../components/layouts";
import {
   DataGrid,
   GridColDef,
   GridRowsProp,
   GridCellParams,
} from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import useSWR from "swr";
import { IUser } from "../../interfaces";

const UsersPage = () => {
   const { data, error } = useSWR<IUser[]>("/api/admin/users");

   if (!data) return;
   if (!data && !error) <></>;

   console.log(data!);

   const columns: GridColDef[] = [
      { field: "email", headerName: "Correo", width: 250 },
      { field: "name", headerName: "Nombre completo", width: 300 },
      { field: "role", headerName: "Rol", width: 300 },
   ];

   const rows = data!.map((user) => ({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
   }));

   return (
      <AdminLayout
         title={"Usuarios"}
         subTitle={"Mantenimiento de usuarios"}
         icon={<PeopleOutline />}
      >
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
      </AdminLayout>
   );
};

export default UsersPage;
