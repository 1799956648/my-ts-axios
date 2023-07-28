import Axios from './core/Axios'

import { AxiosInstance, AxiosRequestConfig, AxiosStatic } from './types/dataInterface'

import { extend } from './helpers/util'

import mergeConfig from './core/mergeConfig' //导入默认参数

import defaults from './defaults'

import CancelToken from './cancel/CancelToken'

import Cancel, { isCancel } from './cancel/Cancel'

const createInstance = function(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)

  const instance = Axios.prototype.request.bind(context)

  extend(instance, context)

  return instance as AxiosStatic
}

const axios = createInstance(defaults)

axios.create = function create(config: AxiosRequestConfig): AxiosStatic {
  return createInstance(mergeConfig(defaults, config)) as AxiosStatic
}

axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

export default createInstance(defaults)
