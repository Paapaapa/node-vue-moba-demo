import axios from 'axios';
import Vue from 'vue';
import router from './router';

const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    // baseURL: 'http://localhost:3000/admin/api',
});

// 请求拦截器
http.interceptors.request.use(config => {
    // 传递token至服务端
    if (localStorage.getItem('token')) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token') || ''}`;
    }
    return config;
}, err => {
    return Promise.reject(err);
});

// 响应拦截器
http.interceptors.response.use(res => {
    return res;
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message,
        });
        if (err.response.status === 401) {
            console.log('redirect to login···')
            router.push('/login');
        }
        return Promise.reject(err);
    }
});

export default http;