import type { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { useProducts } from "../hooks";
import { FullScreenLoading } from "../components/ui";
import "animate.css";

const HomePage: NextPage = () => {
   const { products, isloading } = useProducts("/products");
   // Al usar nuestro hook que por dentro funciona con useSWR(), ademas de obtener la respuesta de la API, tambien estamos guardando el cache del navegador, de esta forma aumenta el rendimiento de la pagina al no tener que volver a realizar muchas peticiones, ademas devuelve un status 304.

   return (
      <ShopLayout
         title="Teslo-Shop - Home"
         pageDescription="Encuentra los mejores productos de Teslo"
      >
         <Typography variant="h1" component="h1">
            Tienda
         </Typography>
         <Typography variant="h2" sx={{ mb: 1 }}>
            Todos los productos
         </Typography>

         {isloading ? (
            <FullScreenLoading />
         ) : (
            <ProductList products={products} />
         )}
      </ShopLayout>
   );
};

export default HomePage;
