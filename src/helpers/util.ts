const toString = Object.prototype.toString

export const isDate = function(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export const isObject = function(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export const isPlainObject = function(val: any): val is Object {
  //  判断传入的数据是否为标准对象格式
  return toString.call(val) === '[object Object]'
}

export const extend = function<T, F>(to: T, from: F): T & F {
  for (const key in from) {
    ;(to as T & F)[key] = from[key] as any
  }
  return to as T & F
}

export const deepMerge = function(...objs: any[]): any {
  // objs 是个数组, 里面存储的传进来的1至2个对象
  const result = Object.create(null) // 创建空对象, 存储最终数据
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        // 得到对象的属性名
        const val = obj[key] // 得到对象的属性名对应的属性值
        if (isPlainObject(val)) {
          // 如果值是对象的话
          if (isPlainObject(result[key])) {
            // 判断此时的最终数据的对象里是否已经存在该名称的值,且也是对象
            result[key] = deepMerge(result[key], val) // 再次进行合并
          } else {
            // 判断此时的最终数据的对象里没有存在该名称的值,或是该值不是对象的
            result[key] = deepMerge({}, val) //  那么拿一个空对象进行合并
          }
        } else {
          result[key] = val //  要是值不是对象的 ,那么直接设置就好, 后面的覆盖前面的
        }
      })
    }
  })
  return result // 返回最终结果
}
