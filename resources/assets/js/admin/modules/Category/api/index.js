export function callApiFetch(params = {}) {
    return axios.get('/categories', params)
        .then(response => response)
        .catch(error => error)
}

export function callApiAdd(params) {
    return axios.post('/categories', params)
        .then(response => response)
        .catch(error => error)
}

export function callApiEdit(id, params) {
    return axios.put(`/categories/${id}`, params)
        .then(response => response)
        .catch(error => error)
}

export function callApiDelete(id) {
    return axios.delete(`/categories/${id}`)
        .then(response => response)
        .catch(error => error)
}

export function callApiShow(id) {
    return axios.get(`/categories/${id}`)
        .then(response => response)
        .catch(error => error)
}
