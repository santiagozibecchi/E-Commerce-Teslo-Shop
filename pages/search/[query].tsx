import type { NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import "animate.css";

interface Props {
   products: IProduct[];
   foundProducts: boolean;
   query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
   return (
      <ShopLayout
         title="Teslo-Shop - Search"
         pageDescription="Encuentra los mejores productos de Teslo"
      >
         <Typography variant="h1" component="h1" mb={1}>
            Buscar Producto
         </Typography>

         {foundProducts ? (
            <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">
               Término: {query}
            </Typography>
         ) : (
            <Box display="flex">
               <Typography variant="h2" sx={{ mb: 3 }}>
                  No encontramos ningún producto
               </Typography>
               <Typography
                  color="secondary"
                  variant="h2"
                  sx={{ mb: 1, ml: 1 }}
                  textTransform="capitalize"
               >
                  {query}
               </Typography>
            </Box>
         )}

         <ProductList products={products} />
      </ShopLayout>
   );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from "next";
import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces";

/*

Podemos hacer la petición HTTP, pero es llamar al propio backend, cuando tenemos acceso a la BBDD directamente, ahorrándonos tiempo y recursos.
*/

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
   // El tipado del generico seria muy grande por eso solamente tipamos el query de esta manera
   const { query = "" } = params as { query: string };

   if (query.length === 0) {
      return {
         redirect: {
            destination: "/",
            // true porque nunca vamos a aceptar un string vacio
            // cuando vengas los bots del google e indexen esta pantalla sabran que si no manda ninguna informacion nunca va a existir
            permanent: true,
         },
      };
   }

   // * Utilizamos "let" porque tambien podria ser que no obtengamos ningun producto
   let products = await dbProducts.getProductsByTerm(query);
   const foundProducts = products.length > 0;

   // TODO: Retornar otros productos si el arreglo no regresa ningun producto
   if (!foundProducts) {
      // products = await dbProducts.getAllProducts();
      // * En lugar de regresar todos los productos podremos regresar uno en particular

      products = await dbProducts.getProductsByTerm("cybertruck");
   }

   return {
      props: { products, foundProducts, query },
   };
};

export default SearchPage;

// * Peticion al backend para que regrese la pantalla con los productos que van a venir basados en el url

// Esta es una pagina que quiero renderizar desde el lado del servidor siempre. Bajo request
// otro gran motivo es que yo no puedo adelantarme a las busquedas de las personas
