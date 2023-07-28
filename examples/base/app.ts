import axios from '../../src/index';

// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         a: 1,
//         b: 2
//     }
// })

// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: ['bar', 'baz']//最终请求的 url 是 /base/get?foo[]=bar&foo[]=baz'
//     }
// })

// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: {
//             bar: 'baz'
//         }
//     }
// })

// const date = new Date()
// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         date
//     }
// })

// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: '@:$, '
//     }
// })

// axios({
//     method: 'get',
//     url: '/base/get',
//     params: {
//         foo: 'bar',
//         baz: null
//     }
// })

// axios({
//     method: 'get',
//     url: '/base/get#hash',
//     params: {
//         foo: 'bar'
//     }
// })

// axios({
//     method: 'get',
//     url: '/base/get?foo=bar',
//     params: {
//         bar: 'baz'
//     }
// })

(async () => {
    const res1 = await axios({
        method: 'post',
        url: '/base/post',
        data: {
            a: 1,
            b: 2
        }
    });
    console.log(res1);

    const res2 = await axios({
        method: 'post',
        url: '/base/post',
        responseType: 'json',
        data: {
            a: 3,
            b: 4
        }
    })
    console.log(res2);
})();


// axios({
//     method: 'post',
//     url: '/base/post',
//     headers: {// 自行标注数据传输类型和字符格式
//         'content-type': 'application/json;charset=utf-8'
//     },
//     data: {
//         a: 1,
//         b: 2
//     }
// })

// const arr = new Int32Array([21, 31])

// axios({
//     method: 'post',
//     url: '/base/buffer',
//     data: arr
// })

// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// axios({
//     method: 'post',
//     url: '/base/post',
//     data: searchParams
// })