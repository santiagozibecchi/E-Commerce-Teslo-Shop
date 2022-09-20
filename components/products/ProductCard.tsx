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
} from "@mui/material";
import { IProduct } from "../../interfaces";
import "animate.css";

interface Props {
   product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
   const [isHovered, setIsHovered] = useState(false);

   // Memorizamos el productImage porque puede cambiar otro estado y no quiero que se vuelva a recalcular cada vez.
   const productImage = useMemo(() => {
      return isHovered
         ? `products/${product.images[1]}`
         : `products/${product.images[0]}`;
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
            <NextLink href="/product/slug" passHref prefetch={false}>
               <Link>
                  <CardActionArea>
                     <CardMedia
                        className="animate__animated animate__fadeIn"
                        component="img"
                        image={productImage}
                        alt={product.title}
                        // className="fadeIn"
                     />
                  </CardActionArea>
               </Link>
            </NextLink>
         </Card>
         <Box sx={{ mt: 1 }} className="fadeIn">
            <Typography fontWeight={700}>{product.title}</Typography>
            <Typography fontWeight={500}>${product.price}</Typography>
         </Box>
      </Grid>
   );
};
