import { FC } from "react";
import NextLink from "next/link";
import {
   Box,
   Button,
   CardActionArea,
   CardMedia,
   Grid,
   Link,
   Typography,
} from "@mui/material";
import { initialData } from "../../database/products";
import { ItemCounter } from "../ui";
// Este componente debe recibir de algun o leerlo de lugar, los productos que voy a mostrar en el carrito de compras.

const productsInCart = [
   initialData.products[0],
   initialData.products[3],
   initialData.products[5],
];

// Para evitar que el cliente pueda editar la orden
interface Props {
   editable?: boolean;
}

export const CartList: FC<Props> = ({ editable }) => {
   return (
      <>
         {productsInCart.map((product) => (
            <Grid container spacing={1} sx={{ mb: 1 }} key={product.slug}>
               <Grid item xs={3.2}>
                  {/* TODO: Llevar a la pagina del producto */}
                  <NextLink href="/product/slug" passHref>
                     <Link>
                        <CardActionArea>
                           <CardMedia
                              image={`/products/${product.images[0]}`}
                              component="img"
                              sx={{ borderRadius: "5px" }}
                           />
                        </CardActionArea>
                     </Link>
                  </NextLink>
               </Grid>
               <Grid item xs={5.8}>
                  <Box display="flex" flexDirection="column">
                     <Typography variant="body2">{product.title}</Typography>
                     <Typography variant="body2">
                        Talla: <strong>M</strong>
                     </Typography>

                     {/* Condicional ya que en un determinado punto no podra volver a modificar la cantidad*/}
                     {editable ? (
                        <ItemCounter />
                     ) : (
                        <Typography variant="body2">Cantidad: 3</Typography>
                     )}
                  </Box>
               </Grid>
               <Grid
                  item
                  xs={3}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
               >
                  <Typography variant="subtitle1">${product.price}</Typography>
                  {/* Editable */}
                  {editable && (
                     <Button variant="text" color="secondary">
                        Remover
                     </Button>
                  )}
               </Grid>
            </Grid>
         ))}
      </>
   );
};
