// import axios from "axios";
// import { useContext, useEffect } from "react";
// import { AuthContext } from "../provider/AuthProvider";

// const axiosInstance = axios.create({
//    baseURL: import.meta.env.VITE_API_URL,
// });

// function useAxios() {
//    const { user } = useContext(AuthContext);

//    useEffect(() => {
//       const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
//          if (user?.accessToken) {
//             config.headers.Authorization = `Bearer ${user.accessToken}`;
//          }
//          return config;
//       });

//       const responseInterceptor = axiosInstance.interceptors.response.use(
//          (response) => response,
//          (error) => {
//             // Optional: handle global errors here
//             return Promise.reject(error);
//          }
//       );

//       // Cleanup both interceptors on unmount or user change
//       return () => {
//          axiosInstance.interceptors.request.eject(requestInterceptor);
//          axiosInstance.interceptors.response.eject(responseInterceptor);
//       };
//    }, [user]);

//    return axiosInstance;
// }

// export default useAxios;
