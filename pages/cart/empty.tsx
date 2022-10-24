import NextLink from "next/link";
import { ShopLayout } from "../../components/layouts";
import { Box, Link, Typography } from "@mui/material";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";

const EmptyPage = () => {
   return (
      <ShopLayout
         title="carrito vacio"
         pageDescription="No hay articulos en el carrito de compras"
      >
         <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="calc(100vh - 200px)"
            sx={{
               flexDirection: { xs: "column", sm: "row" },
            }}
         >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
            <Box display="flex" flexDirection="column" alignItems="center">
               <Typography>Su carrito esta vacio</Typography>
               {/* Por defecto el prefetch esta activo */}
               <NextLink href="/" passHref>
                  <Link typography="h4" color="secondary">
                     Regresar
                  </Link>
               </NextLink>
            </Box>
         </Box>
      </ShopLayout>
   );
};

export default EmptyPage;
