import axios from '../../src/index'
axios({
    url: '/extend/post',
    method: 'post',
    data: {
        msg: 'hi'
    }
})
axios.request({
    url: '/extend/post',
    method: 'post',
    data: {
        msg: 'hello'
    }
})
axios.get('/extend/get')
axios.options('/extend/options')
axios.delete('/extend/delete')
axios.head('/extend/head')
axios.post('/extend/post', { msg: 'post' })
axios.put('/extend/put', { msg: 'put' })
axios.patch('/extend/patch', { msg: 'patch' })

axios({
    url: '/extend/post',
    method: 'post',
    data: {
        msg: 'hcx'
    }
})
axios('/extend/post', {
    method: 'post',
    data: {
        msg: '大帅比'
    }
})

interface responseData<T = any> {
    code: number,
    data: T,
    message: string,
}

interface User {
    name: string
    age: number
}

function getUser<T>() {
    return axios<responseData<T>>('/extend/user')
        .then(res => res.data)
        .catch(error => console.log(error)
        )
}

async function test() {
    const user = await getUser<User>();
    console.log(user);
}


test();