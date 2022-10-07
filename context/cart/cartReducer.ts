import { ICartProduct } from "../../interfaces";
import { CartState } from "./";

type CartActionType =
   | {
        type: "[Cart] - LoadCart from cookies | storage";
        payload: ICartProduct[];
     }
   | { type: "[Cart] - Update products in cart"; payload: ICartProduct[] }
   | { type: "[Cart] - Change Product Cart Quantity"; payload: ICartProduct };

export const cartReducer = (
   state: CartState,
   action: CartActionType
): CartState => {
   switch (action.type) {
      case "[Cart] - LoadCart from cookies | storage":
         return {
            ...state,
            cart: action.payload,
         };
      case "[Cart] - Update products in cart":
         return {
            ...state,
            cart: [...action.payload],
         };

      case "[Cart] - Change Product Cart Quantity":
         return {
            ...state,
            cart: state.cart.map((product) => {
               // si el _id o el sizr son diferentes, no es el producto que quiero actualizar
               if (product._id !== action.payload._id) return product;
               if (product.size !== action.payload.size) return product;

               // Actualizar la cantidad
               // product.quantity = action.payload.quantity
               // return product
               return action.payload;
               // Producto actulizado con la cantidad actualizada
            }),
         };

      default:
         return state;
   }
};
