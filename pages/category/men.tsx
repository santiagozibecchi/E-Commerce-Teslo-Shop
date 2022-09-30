import type { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";
import { FullScreenLoading } from "../../components/ui";
import "animate.css";

const MenPage: NextPage = () => {
   const { products, isloading } = useProducts("/products?gender=men");

   console.log(products);

   return (
      <ShopLayout
         title="Teslo-Shop - Ropa de Hombres"
         pageDescription="Mejores ropas para hombres de productos Teslo"
      >
         <Typography variant="h1" component="h1">
            Tienda
         </Typography>
         <Typography variant="h2" sx={{ mb: 1 }}>
            Todos los productos para hombres
         </Typography>

         {isloading ? (
            <FullScreenLoading />
         ) : (
            <ProductList products={products} />
         )}
      </ShopLayout>
   );
};

export default MenPage;
