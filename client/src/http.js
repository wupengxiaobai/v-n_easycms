import axios from 'axios'
import {
    Loading,
    Message
} from "element-ui"
import router from './router'


let loading;

function startLoading() {
    loading = Loading.service({
        lock: true,
        text: '玩命加载中...',
        background: 'rgba(0,0,0,.66)'
    })
}

function endLoading() {
    loading.close()
}

// axios.defaults.baseURL = 'http://localhost:5000/';
//  请求拦截
axios.interceptors.request.use(config => {
    //  加载动画
    startLoading()
    //  配置统一请求头， token令牌
    if (localStorage.mixiuToken) {
        config.headers.Authorization = localStorage.mixiuToken
    }
    return config
}, error => {
    return Promise.reject(error)
})

//  响应拦截
axios.interceptors.response.use(response => {
    //  结束加载动画
    endLoading()
    return response
}, error => {
    //  错误提醒
    endLoading()
    Message.error(error.response.data)

    //  token 过期处理
    const {
        status
    } = error.response

    if (status == 401) {
        Message.error('token 失效，需重新登录!')
        //  移除本地存储的 token
        localStorage.removeItem('mixiuToken')
        //  跳转登录
        router.push('/login')
    }

    return Promise.reject(error)
})

export default axios