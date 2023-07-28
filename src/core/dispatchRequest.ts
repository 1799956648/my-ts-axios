import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/dataInterface'

import { bulidURL } from '../helpers/url'

import { transformRequest, transformResponse } from '../helpers/data'

import { processHeaders, flattenHeaders } from '../helpers/headers'

import { xhr } from '../core/xhr'

import transform from './transform'

const transfromUrl = function(config: AxiosRequestConfig): string {
  return bulidURL(config.url!, config.params)
}

const transfromRequestData = function(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

const transfromResponseData = function(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

const transformHeaders = function(config: AxiosRequestConfig): any {
  return processHeaders(config.headers, config.data)
}

const processConfig = function(config: AxiosRequestConfig): void {
  config.url = transfromUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

const throwIfCancellationRequested = function(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}

export default function axios(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then((res: AxiosResponse) => transfromResponseData(res))
}
