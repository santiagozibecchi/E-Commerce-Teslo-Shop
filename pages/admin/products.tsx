import useSWR from "swr";
import NextLink from "next/link";

import { CardMedia, Grid, Link } from "@mui/material";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { CategoryOutlined } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { IProduct } from "../../interfaces";
import { format } from "../../utils/currency";

// Conf.de las columnas por fuera porque no van a cambiar, solo se trata de contenido estatico
const columns: GridColDef[] = [
   {
      field: "img",
      headerName: "Foto",
      renderCell: ({ row }: GridRenderCellParams) => {
         return (
            <a href={`/product/${row.slug}`} target="_black" rel="noreferrer">
               <CardMedia
                  component="img"
                  className="fadeIn"
                  alt={row.title}
                  image={`/products/${row.img}`}
               />
            </a>
         );
      },
   },
   {
      field: "title",
      headerName: "Title",
      width: 250,
      renderCell: ({ row }: GridRenderCellParams) => {
         return (
            <NextLink href={`/admin/products/${row.slug}`} passHref>
               <Link underline="always">{row.title}</Link>
            </NextLink>
         );
      },
   },
   { field: "gender", headerName: "Género" },
   { field: "type", headerName: "Tipo" },
   { field: "inStoke", headerName: "Inventario", align: "center" },
   { field: "price", headerName: "Precio", align: "center" },
   { field: "sizes", headerName: "Tallas", width: 250 },
];

const ProductsPage = () => {
   const { data, error } = useSWR<IProduct[]>("/api/admin/products");

   if (!data && !error) return <></>;

   const rows = data!.map((product) => ({
      id: product._id,
      img: product.images[0],
      title: product.title,
      gender: product.gender,
      type: product.type,
      inStoke: product.inStock,
      price: format(product.price),
      sizes: product.sizes.join(", "),
      // Tambien traigo la img para mostrar la imagen en la columna
      slug: product.slug,
   }));

   return (
      <AdminLayout
         title={`Productos (${data?.length})`}
         subTitle={"Mantenimiento de productos"}
         icon={<CategoryOutlined />}
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

export default ProductsPage;
