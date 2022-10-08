import { ICartProduct } from "../../interfaces";
import { CartState } from "./";

type CartActionType =
   | {
        type: "[Cart] - LoadCart from cookies | storage";
        payload: ICartProduct[];
     }
   | { type: "[Cart] - Update products in cart"; payload: ICartProduct[] }
   | { type: "[Cart] - Change Product Cart Quantity"; payload: ICartProduct }
   | { type: "[Cart] - Remove product in cart"; payload: ICartProduct }
   | {
        type: "[Cart] - Update order summary";
        payload: {
           numberOfItems: number;
           subTotal: number;
           tax: number;
           total: number;
        };
     };

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
               // si el _id o el size son diferentes, no es el producto que quiero actualizar
               if (product._id !== action.payload._id) return product;
               if (product.size !== action.payload.size) return product;

               // Actualizar la cantidad
               // product.quantity = action.payload.quantity
               // return product
               return action.payload;
               // Producto actulizado con la cantidad actualizada
            }),
         };

      case "[Cart] - Remove product in cart":
         return {
            ...state,
            cart: state.cart.filter(
               (product) =>
                  !(
                     product._id === action.payload._id &&
                     product.size === action.payload.size
                  )
            ),

            /*{
               const allProductById = state.cart.filter(
                  (product) => product._id === action.payload._id
               );
               const productByIdAndSize = allProductById.find(
                  (p) => p.size === action.payload.size
               );

               if (product !== productByIdAndSize) {
                  return product;
               }
            }
            
            ),*/
         };
      case "[Cart] - Update order summary":
         return {
            ...state,
            ...action.payload
         }

      default:
         return state;
   }
};

// * Forma corta para elimiar un producto
// cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size))
// En sintesis, lo que estoy haciendo primero es, encontrar dentro del arreglo de productos el producto que coincida con el que quiero eliminar, luego lo niego para que devuelva todos, menos al que le estoy haciendo click.
// Otra forma:
/*
   ----------
   if (product._id === action.payload._id && product.size === action.payload.size) {
      return false;
      * regreso falso porque no es el articulo que quiero evaluar.
   }

   return true;
   -----------
*/
