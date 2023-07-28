import {
    AxiosError
} from '../../src/types/dataInterface';

import axios from '../../src/index' //导入axios模块

axios({
    method: 'get',
    url: '/error/get1'
}).then((res) => {
    console.log("get1请求信息");
    console.log(res)
}).catch((e) => {
    console.log("get1请求信息");
    console.log(e)
})

axios({
    method: 'get',
    url: '/error/get'
}).then((res) => {
    console.log("get请求信息");
    console.log(res)
}).catch((e) => {
    console.log("get请求信息");
    console.log(e)
})

setTimeout(() => {
    axios({
        method: 'get',
        url: '/error/get'
    }).then((res) => {
        console.log("延时get请求信息");
        console.log(res)
    }).catch((e) => {
        console.log("延时get请求信息");
        console.log(e)
    })
}, 5000)

axios({
    method: 'get',
    url: '/error/timeout',
    timeout: 2000 // 此次请求定义了请求时间限制
}).then((res) => {
    console.log("设置请求时间上限的请求信息");
    console.log(res)
}).catch((e) => {
    console.log("设置请求时间上限的请求信息");
    console.log(e.message)
})

// axios({
//     method: 'get',
//     url: '/error/timeout',
//     timeout: 2000
//     }).then((res) => {
//     console.log(res)
//     }).catch((e: AxiosError) => {
//     console.log(e.message)
//     console.log(e.request)
//     console.log(e.code)
//     })

axios({
    method: 'get',
    url: '/error/timeout',
    timeout: 2000
}).then((res) => {
    console.log("请求成功")
    console.log(res)
}).catch((e: AxiosError) => {//验证数据格式
    console.log("请求失败")
    console.log(e.message) //输出了 Timeout of 2000 ms exceeded
    console.log(e.code) //'ECONNABORTED'
    console.log(e.config) //对象
})