import axios from '../config/http';

export function callApiFetch(params = {}) {
    console.log(params);

    return axios.get('/upload/image', { params })
        .then(response => response)
        .catch(error => error)
}