import axios from 'axios';


const generacionApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

// ----- TODO: CONFIGURE INTERCEPTORS
// generacionApi.interceptors.request.use((config) => {
//   config.headers = {
//     ...config.headers,
//     'x-token': localStorage.getItem('token'),
//   };
//   return config;
// });

export default generacionApi;
