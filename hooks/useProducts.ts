import useSWR, { SWRConfiguration } from "swr";
import { IProduct } from "../interfaces/products";

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
   const { data, error } = useSWR<IProduct[]>(`/api${url}`, config);

   return {
      // si todavia no tenemos productos sera igual a un arreglo vacio
      products: data || [],
      // data en un principio = undefined
      // si no hay error = undefined
      // si no hay data y tampoco error => true
      isloading: !error && !data,
      isError: error,
   };
};

// * useProduct podria ser un hook generico pero no en este caso
// useProduct<--ESPECIFICO EL TIPO DE DATA QUE regresa-->("....URL....")

// No necesito aca porque esta global
// const fetcher = (...args: [key: string]) =>
// fetch(...args).then((res) => res.json());
// const { data, error } = useSWR<IProduct[]>(`/api${url}`, fetcher);
