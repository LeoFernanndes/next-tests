import axios from 'axios';


const baseURL = 'http://127.0.0.1:8000'

type AuthTokenData = {
    access: string
    refresh: string
}

type UserData = {
  id: string,
  last_login?: string,
  username: string,
  first_name?: string,
  last_name?: string,
  email: string,
  is_active: boolean,
  date_joined: string,
  main_profile_image_url?: string
}

const axiosClient = axios.create({
    baseURL: baseURL
})

axiosClient.interceptors.request.use(
    (config) => {
        const tokenDataString = localStorage.getItem('tokenData');
        if (tokenDataString) {
            const tokenData = JSON.parse(tokenDataString)
            config.headers.Authorization = `Bearer ${tokenData['access']}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    } 
);

axiosClient.interceptors.response.use(
    response => response, // Directly return successful responses.
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
        try {
          const tokenDataString = localStorage.getItem('tokenData'); // Retrieve the stored refresh token.
          let tokenData
          if (tokenDataString){
            tokenData = JSON.parse(tokenDataString)
          }
          const refreshToken = tokenData['refresh'] 
          // Make a request to your auth server to refresh the token.
          const response = await axios.post(`${baseURL}/api/token/refresh/`, {
            refresh: refreshToken,
          });
          const newTokenData = {access: response.data['access'], refresh: response.data['refresh']}
          localStorage.setItem('tokenData', JSON.stringify(newTokenData))
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${newTokenData.access}`;
          return axiosClient(originalRequest); // Retry the original request with the new access token.
        } catch (refreshError) {
          // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
          console.error('Token refresh failed:', refreshError);
          localStorage.removeItem('tokenData');
          localStorage.removeItem('userData')
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error); // For all other errors, return the error as is.
    }
  );

export default axiosClient;