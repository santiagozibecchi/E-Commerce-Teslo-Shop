import axios from "axios";

const productApi = axios.create({
   baseURL: "/api",
});

export default productApi;
