import { FC, PropsWithChildren, useReducer } from "react";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";
// InitialState
export interface CartState {
   cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
   cart: [],
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
   const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

   const addProductToCart = (product: ICartProduct) => {
      // ! Nivel 1
      // dispatch({ type: "[Cart] - Add Product", payload: product });

      // ! Nivel 2
      // Puede ser que tenga productos repetidos.
      // Todos los productos que no coinciden con el producto que se esta mandando
      // const productsInCart = state.cart.filter(
      //    (p) => p._id !== product._id && p.size !== product.size
      // );
      // dispatch({
      //    type: "[Cart] - Add Product",
      //    payload: [...productsInCart, product],
      // });
      // El problema de esta forma es que no estaria acumulando si ya tengo el articulo en el carrito

      // ! Lo que se pide
      // Verificar si existe ese producto con ese _id
      // some => regresa un valor boleando si existe o no
      const productInCart = state.cart.some((p) => p._id === product._id);
      if (!productInCart)
         return dispatch({
            type: "[Cart] - Update products in cart",
            payload: [...state.cart, product],
         });

      // Si existe el producto por id, tengo que evaluar si es la misma talla
      const productInCartButDifferenceSize = state.cart.some(
         (p) => p._id === product._id && p.size === product.size
      );
      if (!productInCartButDifferenceSize)
         return dispatch({
            type: "[Cart] - Update products in cart",
            payload: [...state.cart, product],
         });

      // Si llegamos a este punto significa que el producto SI existe y tambien existe con la talla que esta llegando, es decir, ya se encuentra en el carrito. Por lo tanto, hay que acumular el producto
      const updatedProducts = state.cart.map((p) => {
         // * Estas dos condiciones estan porque quiero editar la cantidad de productos que solamente sean iguales. No interesa que sean distintos porq no cumple mi condicion

         // Significa que no es el producto que tengo que editar, entonces regreso los mismos productos
         if (p._id !== product._id) return p;
         // Lo mismo para las tallas, si es distinto significa que es una talla diferente
         if (p.size !== product.size) return p;

         // * Actualizar la cantidad
         p.quantity += product.quantity;

         return p;
      });

      return dispatch({
         type: "[Cart] - Update products in cart",
         payload: updatedProducts,
      });
   };

   return (
      <CartContext.Provider
         value={{
            ...state,

            // Methods
            addProductToCart,
         }}
      >
         {children}
      </CartContext.Provider>
   );
};
