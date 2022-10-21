import { PeopleOutline } from "@mui/icons-material";
import { AdminLayout } from "../../components/layouts";
import {
   DataGrid,
   GridColDef,
   GridRowsProp,
   GridCellParams,
   GridValueGetterParams,
} from "@mui/x-data-grid";
import { Grid, MenuItem, Select } from "@mui/material";
import useSWR from "swr";
import { IUser } from "../../interfaces";
import { tesloApi } from "../../api";

const UsersPage = () => {
   const { data, error } = useSWR<IUser[]>("/api/admin/users");

   if (!data) return;
   if (!data && !error) return <></>;

   const onRoleUpdated = async (userId: string, newRole: string) => {
      try {
         await tesloApi.put("/admin/users", { userId, newRole });
      } catch (error) {
         console.log(error);
         alert("No se pudo actualizar el rol del usuario");
      }
   };

   const columns: GridColDef[] = [
      { field: "email", headerName: "Correo", width: 250 },
      { field: "name", headerName: "Nombre completo", width: 300 },
      {
         field: "role",
         headerName: "Rol",
         width: 300,
         renderCell: ({ row }: GridCellParams) => {
            return (
               <Select
                  value={row.role}
                  label="Rol"
                  // El target siempre contiene el valor de input en la propiedad value
                  onChange={({ target }) => onRoleUpdated(row.id, target.value)}
                  sx={{
                     width: "300px",
                  }}
               >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="super-user">Super User</MenuItem>
                  <MenuItem value="SEO">SEO</MenuItem>
                  <MenuItem value="client">Client</MenuItem>
               </Select>
            );
         },
      },
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
