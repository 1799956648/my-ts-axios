import { AxiosRequestConfig, AxiosResponse } from '../types/dataInterface'

// todo 参数对象考虑用对象
export class AxiosError extends Error {
  //定义基本参数
  public isAxiosError: boolean
  public config: AxiosRequestConfig
  public code?: string | null
  public request?: any
  public response?: AxiosResponse
  constructor(
    message: string, //报错信息
    config: AxiosRequestConfig, //axios请求的配置文件
    code?: string | null, //错误状态代码
    request?: any, //XHR请求的实例对象
    response?: AxiosResponse //请求返回的数据信息
  ) {
    super(message)
    this.config = config //把在构造函数传入的信息设置为实例的属性
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true //设置一个布尔值, 定义当前情况下的一个状态描述
    Object.setPrototypeOf(this, AxiosError.prototype) // 手动定义值得原型继承
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  return new AxiosError(message, config, code, request, response)
}
