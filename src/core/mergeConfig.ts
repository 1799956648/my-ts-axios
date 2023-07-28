import { deepMerge, isPlainObject } from '../helpers/util' //导入深度合并的函数 和判断是否为标准对象的方法

import { AxiosRequestConfig } from '../types/dataInterface'

const strats = Object.create(null) //创建一个空对象, 里面用来存储针对某些特殊数据信息采用的合并函数

const stratKeysFromVal2 = ['url', 'params', 'data'] // 特殊信息名

function fromVal2Strat(val1: any, val2: any): any {
  //创造新的合并函数
  if (typeof val2 !== 'undefined') {
    // 因为链接 链接参数 提交数据等信息必然是用户自行定义的, 所以只对用户的值进行判断
    return val2
  }
}

stratKeysFromVal2.forEach(key => {
  //针对这三种情况 把处理函数和对应数据类型名称进行绑定
  strats[key] = fromVal2Strat
})

// val1 是默认参数 , val2是用户自行设置的参数
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    //如果val2是对象, 则采用深度合并函数来合并两个数据
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    //如果 val2不是对象, 而且是非空值,
    return val2
  } else if (isPlainObject(val1)) {
    //只有val1 存在, 且 val1 是对象则返回 深度合并单个值的结果
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    //只有val1 存在 且不是对象的, 直接返回该值
    return val1
  }
}

const stratKeysDeepMerge = ['headers'] //把 该函数与 headers的属性类型名称进行绑定
stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

export default function mergeConfig( //把用户默认配置文件和 后期二次传入的文件进行合并
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig // 用户后期传入的配置文件属于可选参数, 可传可不传
): AxiosRequestConfig {
  if (!config2) {
    //如果用户后期传入的文件不存在 则直接初始化一个空对象
    config2 = {}
  }

  const config = Object.create(null) //创造一个空对象, 用来存储最终的配置数据

  for (let key in config2) {
    mergeField(key) // 遍历对象 执行合并
  }

  for (let key in config1) {
    if (!config2[key]) {
      // 遍历对象 执行合并 并跳过, 在config2中已经定义的属性
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat //选择不同的合并策略, 根据属性的不同 选择不同的函数, 如果没有特制的函数, 使用默认的函数处理
    config[key] = strat(config1[key], config2![key]) //执行合并
  }

  return config
}
