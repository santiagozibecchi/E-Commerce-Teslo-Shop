import { useContext, useState } from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";

import { CartContext } from "../../context";

import { Grid, Box, Typography, Button, Chip } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductSlidesShow, SizeSelector } from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { ICartProduct, IProduct, ISize } from "../../interfaces";

import { dbProducts } from "../../database";

interface Props {
   product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
   const { addProductToCart } = useContext(CartContext);
   const router = useRouter();

   // Creo un estado temporal
   const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
      _id: product._id,
      images: product.images[0],
      price: product.price,
      size: undefined,
      slug: product.slug,
      title: product.title,
      gender: product.gender,
      quantity: 1,
   });

   // Actualiza la talla
   const selectedSize = (size: ISize) => {
      setTempCartProduct((currentProduct) => ({
         ...currentProduct,
         size,
      }));
   };

   // Actualiza la cantidad
   const onUpdateQuantity = (quantity: number) => {
      setTempCartProduct((currentProduct) => ({
         ...currentProduct,
         quantity,
      }));
   };

   const onAddProduct = () => {
      if (!tempCartProduct.size) return;

      addProductToCart(tempCartProduct);
      router.push("/cart");
   };

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
                     <ItemCounter
                        currentValue={tempCartProduct.quantity}
                        maxValue={product.inStock}
                        updatedQuantity={onUpdateQuantity}
                     />
                     {/* Tallas */}
                     <SizeSelector
                        // solo lectura del estado, quien esta pendiente
                        selectedSize={tempCartProduct.size}
                        sizes={product.sizes}
                        // Funcion que se ejecuta dentro del componente
                        // Cada vez que se genera el onClick dentro de este, se ejecuta esta funcion y llama a la funcion selectedSize para actualizar el estado temporal
                        // onSelectedSize recibe el size dentro del componente y se lo pasa a selectedSize
                        onSelectedSize={selectedSize}
                     />
                  </Box>

                  {/* // * Agregar al carrito */}

                  {product.inStock > 0 ? (
                     <Button
                        onClick={onAddProduct}
                        color="secondary"
                        className="circular-btn"
                     >
                        {tempCartProduct.size
                           ? "Agregar al carrito"
                           : "Seleccione una talla"}
                     </Button>
                  ) : (
                     <Chip
                        label="No hay disponibles"
                        color="error"
                        variant="outlined"
                     />
                  )}

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

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async () => {
   const slugs = await dbProducts.getAllProductsSlugs();

   // paths en un arreglo de objetos que recibe los params
   return {
      paths: slugs.map(({ slug }) => ({
         params: {
            slug,
         },
      })),
      fallback: "blocking",
   };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
   // params = argumento del url
   const { slug = "" } = params as { slug: string };
   const product = await dbProducts.getProductBySlug(slug);

   // Puede ser que tengamos o no un producto EN LA BASE DE DATOS
   if (!product) {
      return {
         redirect: {
            destination: "/",
            permanent: false,
         },
      };
   }
   // ESTO ES CUANDO EL PRODUCTO ESTA YA EN LA BASE DE DATOS
   // Puede ser que agrege un producto despues de construir el sitio, y cuando este sea el caso, quiero que tmb next construya esa pagina y la almacene el fileSystem. SE VERA EN FUNCIONAMIENTO CON EL MANTENIMIENTO DE LOS PRODUCTOS

   return {
      props: { product },
      revalidate: 86400,
   };
};

export default ProductPage;

// ! En caso de usar SSP
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// import { GetServerSideProps } from "next";

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//    const { params } = ctx;
//    const { slug = "" } = params as { slug: string };

//    const product = await dbProducts.getProductBySlug(slug);

//    // Si el producto no existe
//    if (!product) {
//       return {
//          redirect: {
//             destination: "/",
//             permanent: false,
//          },
//       };
//    }

//    return {
//       props: { product },
//    };
// };

// ! En caso de utilizar el hook

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

// * la cantidad deberia esta relacionado en base a la cantidad de talla que posea en el inventario
