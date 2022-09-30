import React from "react";
import { useRouter } from "next/router";
import { Grid, Box, Typography, Button, Chip } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductSlidesShow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";


const ProductPage = () => {


   

   return (
      <ShopLayout title={product.title} pageDescription={product.description}>
         <Grid container spacing={3}>
            <Grid item xs={12} sm={7}>
               <ProductSlidesShow images={product.images} />
            </Grid>
            <Grid item xs={12} sm={5}>
               <Box display="flex" flexDirection="column">
                  {/* // * Titulos */}

                  <Typography variant="h1" component="h1">
                     {product.title}
                  </Typography>
                  <Typography variant="subtitle1" component="h2">
                     ${product.price}
                  </Typography>
                  {/* // * Cantidad */}

                  <Box sx={{ my: 2 }}>
                     <Typography variant="subtitle2">Cantidad</Typography>
                     <ItemCounter />
                     {/* Tallas */}
                     <SizeSelector
                        // seletedSize={/* product.sizes[0] */ }
                        sizes={[...product.sizes]}
                     />
                  </Box>

                  {/* // * Agregar al carrito */}

                  <Button color="secondary" className="circular-btn">
                     Agregar al carrito
                  </Button>

                  {/* <Chip
                     label="No hay disponibles"
                     color="error"
                     variant="outlined"
                  /> */}

                  {/* Descripcion */}
                  <Box sx={{ mt: 3 }}>
                     <Typography variant="subtitle2">Descripcion</Typography>
                     <Typography variant="body2">
                        {product.description}
                     </Typography>
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </ShopLayout>
   );
};

export default ProductPage;

// En caso de utilizar el hook

// en un pricipio regresa undefined
// const router = useRouter();
// const { products: product, isLoading } = useProducts<IProduct>(
//    `/products/${router.query.slug}`
// );
// -------
// if (isLoading) {
//    return <h1>Cargando</h1>;
// }
// if (!product) {
//    return <h1>No existe</h1>;
// }
