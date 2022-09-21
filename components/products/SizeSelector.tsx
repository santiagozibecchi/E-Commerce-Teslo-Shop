import React, { FC } from "react";
import { ISize } from "../../interfaces";
import { Box, Button } from "@mui/material";

interface Props {
   seletedSize?: ISize;
   sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({ seletedSize, sizes }) => {
   return (
      <Box>
         {sizes.map((size) => (
            <Button
               key={size}
               size="small"
               color={seletedSize === size ? "primary" : "info"}
            >
               {size}
            </Button>
         ))}
      </Box>
   );
};
