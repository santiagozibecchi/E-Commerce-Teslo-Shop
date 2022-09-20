import type { NextPage } from "next";
import { Typography } from "@mui/material";

import { ShopLayout } from "../components/layouts";
import { initialData } from "../database/products";
import { ProductList } from "../components/products";

const Home: NextPage = () => {
   return (
      <ShopLayout
         title={"Teslo-Shop - Home"}
         pageDescription={"Encuentra los mejores productos de Teslo"}
      >
         <Typography variant="h1" component="h1">
            Tienda
         </Typography>
         <Typography variant="h2" sx={{ mb: 1 }}>
            Todos los productos
         </Typography>

         {/* any temporal ya que todavia no levantamos la base de datos */}
         <ProductList products={initialData.products as any} />
      </ShopLayout>
   );
};

export default Home;
