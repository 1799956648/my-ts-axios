import { isPlainObject } from './util'

export const transformRequest = function(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export const transformResponse = function(data: any): any {
  //传入参数data
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data) //如果data是字符串, 那么我们就把他转化为对象
    } catch (e) {
      //容错
      // do nothing
    }
  }
  return data
}
