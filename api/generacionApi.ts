import axios from 'axios';


const generacionApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

// ----- TODO: CONFIGURE INTERCEPTORS Commented for future use in user authentication
// generacionApi.interceptors.request.use((config) => {
//   config.headers = {
//     ...config.headers,
//     'x-token': localStorage.getItem('token'),
//   };
//   return config;
// });

export default generacionApi;
