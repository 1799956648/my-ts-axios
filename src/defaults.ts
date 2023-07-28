import { AxiosRequestConfig } from './types/dataInterface' // 引入请求配置文件的接口

import { processHeaders } from './helpers/headers'

import { transformRequest, transformResponse } from './helpers/data'

const defaults: AxiosRequestConfig = {
  // 定义基础默认参数
  method: 'get', // 默认采用get方法请求数据
  timeout: 0, // 默认实时提交
  headers: {
    common: {
      // 每次提交都要加上该参数数据
      Accept: 'application/json, text/plain, */*' // 定义接受的参数格式
    }
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options'] // 在headers中再初始化一些属性, 属性值默认皆为对象
const methodsWithData = ['post', 'put', 'patch'] // 每种请求方式都设置一个默认内容类型参数

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
