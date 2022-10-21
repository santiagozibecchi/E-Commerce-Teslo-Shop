import { useState, useEffect } from "react";
import { PeopleOutline } from "@mui/icons-material";
import useSWR from "swr";

import {
   DataGrid,
   GridColDef,
   GridRowsProp,
   GridCellParams,
   GridValueGetterParams,
} from "@mui/x-data-grid";
import { Grid, MenuItem, Select } from "@mui/material";

import { AdminLayout } from "../../components/layouts";
import { IUser } from "../../interfaces";
import { tesloApi } from "../../api";

const UsersPage = () => {
   const { data, error } = useSWR<IUser[]>("/api/admin/users");
   // Estos usuarios tienen que tener el valor de la data, cuando la data cambie
   const [users, setUsers] = useState<IUser[]>([]);

   useEffect(() => {
      // Nos aseguramos que la data exista
      if (data) {
         setUsers(data);
      }
   }, [data]);

   if (!data && !error) return <></>;

   const onRoleUpdated = async (userId: string, newRole: string) => {
      // * Si sucede un error durante la petición:
      const previosUsers = users.map((user) => ({ ...user }));

      // * De esta manera ya tengo el usuario actualizado del lado del front-end muy rápido
      const updatedUsers = users.map((user) => ({
         ...user,
         role: userId === user._id ? newRole : user.role,
      }));

      // Se actualiza y se renderiza nuevamente el componente al cambiar el estado de manera casi instantanea. Por eso se setea antes de realizar la peticion (Por fuera y antes del "try")
      setUsers(updatedUsers);

      // ! La peticion puede fallar => hay que revertir el cambio del estado
      try {
         await tesloApi.put("/admin/users", { userId, newRole });
      } catch (error) {
         setUsers(previosUsers);
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

   const rows = users.map((user) => ({
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
