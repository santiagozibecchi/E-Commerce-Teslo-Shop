import { Box, Drawer, List, ListItem, Input } from "@mui/material";

export const SideMenu = () => {
   return (
      <Drawer open={true} anchor="right" sx={{ backdropFilter: "blur(4px)" }}>
         <Box>
            <List>
               <ListItem>
                  <Input />
               </ListItem>
            </List>
         </Box>
      </Drawer>
   );
};
