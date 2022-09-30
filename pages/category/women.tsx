import type { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";
import { FullScreenLoading } from "../../components/ui";
import "animate.css";

const WomenPage: NextPage = () => {
   const { products, isloading } = useProducts("/products?gender=women");

   return (
      <ShopLayout
         title="Teslo-Shop - Ropas de Mujeres"
         pageDescription="Mejores ropas para mujeres de productos Teslo"
      >
         <Typography variant="h1" component="h1">
            Tienda
         </Typography>
         <Typography variant="h2" sx={{ mb: 1 }}>
            Todos los productos para mujeres
         </Typography>

         {isloading ? (
            <FullScreenLoading />
         ) : (
            <ProductList products={products} />
         )}
      </ShopLayout>
   );
};

export default WomenPage;
