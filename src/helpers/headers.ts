import { isPlainObject, deepMerge } from './util'

import { Method } from '../types/dataInterface'

export const normalizeHeaderName = function(headers: any, normalizeHeaderName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (
      name !== normalizeHeaderName &&
      name.toLocaleLowerCase === normalizeHeaderName.toLocaleLowerCase
    ) {
      headers[normalizeHeaderName] = headers[name]
      Reflect.deleteProperty(headers, name)
    }
  })
}

export const parseHeaders = function(headers: string): any {
  // 传入一个headers字符串
  let parsed = Object.create(null) // 创建一个空对象 作为后期
  if (!headers) {
    // 如果没有返回的响应头数据, 则直接返回一个空对象
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    //  利用换行符号\r 是回到行首， \n 是换行 一般键盘的enter是两个命令的组合 作为切割符, 把字符串切割为数组
    let [key, val] = line.split(':') //  二次切割 利用冒号把每一条数据 切割成名值对 并进行结构赋值
    key = key.trim().toLowerCase() // 键名去除掉两边的空格并设置为小写字母
    if (!key) {
      //  如果此时键名不存在, 就退出循环, 防止空格字符串作为名字
      return
    }
    if (val) {
      // 修剪掉值两侧的空格
      val = val.trim()
    }
    parsed[key] = val // 添加值
  })
  return parsed
}

export const processHeaders = function(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export const flattenHeaders = function(headers: any, method: Method): any {
  if (!headers) {
    // 如果headers不存在, 那么我就直接返回一个undefined
    return headers
  }
  headers = deepMerge(headers.common || {}, headers[method] || {}, headers) // 把headers里面的common和method里面的参数全都领出来, 进行合并, 不在需要用啥额外的属性名称
  // 把一下这些直接定义在headers下面的进行删除
  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  methodsToDelete.forEach(method => {
    delete headers[method]
  })
  return headers
}
