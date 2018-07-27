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

export function setHeaderAxios(data = null) {
    data = data || localStorage.getItem('token') || '{}';
    try {
        data = JSON.parse(data);
    } catch (error) {

        return;
    }
    axios.defaults.headers.common['Authorization'] = data.type + ' ' + data.token;
}
