import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";

const axiosInstance = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
});

function useAxios() {
   const { user } = useContext(AuthContext);

   useEffect(() => {
      const requestInterceptor = axiosInstance.interceptors.request.use(
         (config) => {
            const token = user?.accessToken;
            if (token) {
               config.headers.authorization = `Bearer ${token}`;
            }
            return config;
         },
         (error) => {
            return Promise.reject(error);
         }
      );

      const responseInterceptor = axiosInstance.interceptors.response.use(
         (response) => response,
         (error) => {
            console.log("❌ error in interceptor:", error);
            return Promise.reject(error);
         }
      );

      // Cleanup interceptor on unmount
      return () => {
         axiosInstance.interceptors.request.eject(requestInterceptor);
         axiosInstance.interceptors.response.eject(responseInterceptor);
      };
   }, [user]);

   return axiosInstance;
}

export default useAxios;
