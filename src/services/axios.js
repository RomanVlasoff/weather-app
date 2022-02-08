import _axios from 'axios'
import store from '@/store'

const axios = _axios.create();

axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit response config
    return response;
}, error => {
    console.log(error);
    store.commit('SET_ERROR', 'requestError')
    return Promise.reject(error);
});

export default axios;
