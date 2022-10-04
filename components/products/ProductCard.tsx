import { FC, useMemo, useState } from "react";
import NextLink from "next/link";
import {
   Grid,
   Card,
   CardActionArea,
   CardMedia,
   Box,
   Typography,
   Link,
   Chip,
} from "@mui/material";
import { IProduct } from "../../interfaces";

interface Props {
   product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
   const [isHovered, setIsHovered] = useState(false);
   const [isImageLoaded, setIsImageLoaded] = useState(false);

   // Memorizamos el productImage porque puede cambiar otro estado y no quiero que se vuelva a recalcular cada vez que otro componente cambie su estado.
   const productImage = useMemo(() => {
      return isHovered
         ? `/products/${product.images[1]}`
         : `/products/${product.images[0]}`;
   }, [isHovered, product.images]);

   return (
      <Grid
         item
         xs={6}
         sm={4}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
      >
         <Card>
            <NextLink
               href={`/product/${product.slug}`}
               passHref
               prefetch={false}
            >
               <Link>
                  <CardActionArea>
                     {product.inStock === 0 && (
                        <Chip
                           label="No hay disponibles"
                           sx={{
                              position: "absolute",
                              zIndex: "99",
                              bottom: "5px",
                              left: "5px",
                              backgroundColor: "#E5E5E5",
                           }}
                        />
                     )}

                     <CardMedia
                        className="animate__animated animate__fadeIn"
                        component="img"
                        image={productImage}
                        alt={product.title}
                        // onload se dispara cuando el recurso se carga
                        onLoad={() => setIsImageLoaded(true)}
                     />
                  </CardActionArea>
               </Link>
            </NextLink>
         </Card>
         <Box
            sx={{ mt: 1, display: isImageLoaded ? "block" : "none" }}
            className="animate__animated animate__fadeIn"
         >
            <Typography fontWeight={700}>{product.title}</Typography>
            <Typography fontWeight={500}>${product.price}</Typography>
         </Box>
      </Grid>
   );
};
