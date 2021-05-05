import axios from 'axios';

const axiosService = axios.create({
  baseURL:"/",
  timeout: 500
});


export default axiosService;