axios.defaults.baseURL = '/api/';
axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    if (error.response.status === 401) {
        this.$router.push('/login');
    }
    return Promise.reject(error);
});
