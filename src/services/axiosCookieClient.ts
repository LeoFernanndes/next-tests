import axios from 'axios';

const axiosCookieClient = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true, // Important for httpOnly cookies
});

axiosCookieClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status == 401 && !originalRequest._retry){
      originalRequest._retry = true;     
      
      try {
        const refreshResponse = await axios.post('http://localhost:8000/api/v1/users/auth/refresh/', {}, {withCredentials: true})
        return axiosCookieClient(originalRequest)
      } catch(refreshError){
        return Promise.reject(refreshError)     
      }
    } else {
    return Promise.reject(error)
  }
})



export default axiosCookieClient;