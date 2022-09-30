import type { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { useProducts } from "../hooks";
import { FullScreenLoading } from "../components/ui";
import "animate.css";

const HomePage: NextPage = () => {
   const { products, isloading } = useProducts("/products");

   console.log(products);

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
