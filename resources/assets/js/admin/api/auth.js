import axios from '../config/http';

export function callApiLogin(params = {}) {
    console.log(params);

    return axios.post('/login', params)
        .then(response => response)
        .catch(error => error)
}

export function callApiCheckToken(params = {}) {

    return axios.post('/checkToken', params)
        .then(response => response)
        .catch(error => error)
}

export function callApiRefreshToken(params = {}) {

    return axios.post('/refreshToken', params)
        .then(response => response)
        .catch(error => error)
}

export function setHeaderAxios(axios) {
    let token =  localStorage.getItem('token') || '{}';
    try {
        token = JSON.parse(token);
    } catch (error) {

        return;
    }
    axios.defaults.headers.common['Authorization'] = token.type + ' ' + token.token;
}
