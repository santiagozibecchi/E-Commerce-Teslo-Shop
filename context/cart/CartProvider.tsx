import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import Cookie from "js-cookie";
import { ICartProduct } from "../../interfaces";
import { CartContext, cartReducer } from "./";
// InitialState
export interface CartState {
   isLoaded: boolean;
   cart: ICartProduct[];
   numberOfItems: number;
   subTotal: number;
   tax: number;
   total: number;

   // Opcional porq puede ser que la persona no lo tenga al inicial la aplicacion
   shippingAddress?: ShippingAddress;
}

export interface ShippingAddress {
   firstName: string;
   lastName: string;
   address: string;
   address2?: string;
   zip: string;
   city: string;
   country: string;
   phone: string;
}

const CART_INITIAL_STATE: CartState = {
   isLoaded: false,
   cart: [],
   numberOfItems: 0,
   subTotal: 0,
   tax: 0,
   total: 0,

   shippingAddress: undefined,
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
   const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

   // Efecto para obtener las cookies y recargar el carrito
   useEffect(() => {
      // ! El payload da la cookie puede ser modificado del lado del navegador
      try {
         const cartFromCookie = Cookie.get("cart")
            ? JSON.parse(Cookie.get("cart")!)
            : [];
         dispatch({
            type: "[Cart] - LoadCart from cookies | storage",
            payload: cartFromCookie,
         });
      } catch (error) {
         // ! Si no logra parsear la cookie, seria porque alguien la manipulo, no tiene la forma que nosotros estamos esparando.
         dispatch({
            type: "[Cart] - LoadCart from cookies | storage",
            payload: [],
         });
      }
   }, []);

   // Agregar shippingAddress automaticamente al estado
   useEffect(() => {
      // En el caso de que estemos cargando la app por primera vez y no tengamos ningun valor guardado
      // Solo si tenemos firstName cargamos, no hace falta grabar todos los campos ya que se graba todo al mismo tiempo
      if (Cookie.get("firstName")) {
         const shippingAddress = {
            firstName: Cookie.get("firstName") || "",
            lastName: Cookie.get("lastName") || "",
            address: Cookie.get("address") || "",
            address2: Cookie.get("address2") || "",
            zip: Cookie.get("zip") || "",
            city: Cookie.get("city") || "",
            country: Cookie.get("country") || "",
            phone: Cookie.get("phone") || "",
         };

         dispatch({
            type: "[Cart] - LoadAddress from cookies",
            payload: shippingAddress,
         });
      }
   }, []);

   // Cada vez que el estado del carrito cambia, disparo un efecto para agregar productos a la cookie.
   useEffect(() => {
      if (state.cart.length > 0) Cookie.set("cart", JSON.stringify(state.cart));

      // La siguiente linea de codigo es valida pero genero un [] al actualizar la página, esto sólo pasa en desarrollo por el modo estricto.
      // Cookie.set("cart", JSON.stringify(state.cart));
   }, [state.cart]);

   // Efecto encargado de actualizar el numero de items, el total a pagar, impuestos, etc
   useEffect(() => {
      const numberOfItems = state.cart.reduce(
         (prev, current) => current.quantity + prev,
         0
      );
      const subTotal = state.cart.reduce(
         (prev, current) => current.price * current.quantity + prev,
         0
      );
      const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

      const orderSummary = {
         numberOfItems,
         subTotal,
         tax: subTotal * taxRate,
         total: subTotal * (1 + taxRate),
      };

      // cada vez que cambia el state, actualiza todo el state + la orden
      dispatch({
         type: "[Cart] - Update order summary",
         payload: orderSummary,
      });
   }, [state.cart]);

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

   const updateCartQuantity = (product: ICartProduct) => {
      dispatch({
         type: "[Cart] - Change Product Cart Quantity",
         payload: product,
      });
   };

   const removeCardProduct = (product: ICartProduct) => {
      dispatch({ type: "[Cart] - Remove product in cart", payload: product });
   };

   return (
      <CartContext.Provider
         value={{
            ...state,
            cart: state.cart,

            // Methods
            addProductToCart,
            removeCardProduct,
            updateCartQuantity,
         }}
      >
         {children}
      </CartContext.Provider>
   );
};
