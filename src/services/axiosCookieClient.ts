import axios from 'axios';


const axiosCookieClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ROOT}:${process.env.NEXT_PUBLIC_API_PORT}`,
  withCredentials: true, // Important for httpOnly cookies
});

axiosCookieClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status == 401 && !originalRequest._retry){
      originalRequest._retry = true;     
      
      try {
        const refreshResponse = await axios.post(`${process.env.API_ROOT}:${process.env.API_PORT}/api/v1/users/auth/refresh/`, {}, {withCredentials: true})
        return axiosCookieClient(originalRequest)
      } catch(refreshError){
        return Promise.reject(refreshError)     
      }
    } else {
    return Promise.reject(error)
  }
})



export default axiosCookieClient;