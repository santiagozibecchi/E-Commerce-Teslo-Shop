import { createContext } from "react";
import { ShippingAddress } from "./";
import { ICartProduct } from "../../interfaces";

interface ContextProps {
   cart: ICartProduct[];
   numberOfItems: number;
   subTotal: number;
   tax: number;
   total: number;
   isLoaded: boolean;

   shippingAddress?: ShippingAddress;

   //  Methos
   addProductToCart: (product: ICartProduct) => void;
   updateCartQuantity: (product: ICartProduct) => void;
   removeCardProduct: (product: ICartProduct) => void;
   updateAddress: (address: ShippingAddress) => void;
}
export const CartContext = createContext({} as ContextProps);
