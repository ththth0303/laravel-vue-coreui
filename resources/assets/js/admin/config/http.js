import axios  from "axios";
import vue  from "../main";
import { setHeaderAxios } from "../api/auth";
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = '/api/';
axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    if (error.response.status === 401) {
        vue.$router.push({
            path: '/login',
            query: {
                redirect: vue.$router.currentRoute.fullPath,
            },
        });
    }
    return Promise.reject(error);
});

setHeaderAxios(axios);

export default axios;


