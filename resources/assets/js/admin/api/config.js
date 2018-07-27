export function setHeader(data = null) {
    data = data || localStorage.getItem('token') || '';
    data = JSON.parse(data);
    console.log(data);
    
    axios.defaults.headers.common['Authorization'] = data.type + ' ' + data.token;
}