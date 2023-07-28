import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/dataInterface'

import { parseHeaders } from '../helpers/headers'

import { createError } from '../helpers/error'

export const xhr = function(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const handleResponse = function(response: AxiosResponse): void {
      const responseStatus = response.status
      if (responseStatus >= 200 && responseStatus <= 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }

    const { data = null, method = 'get', headers, url, responseType, timeout, cancelToken } = config

    const request = new XMLHttpRequest()

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    if (timeout) {
      request.timeout = timeout
    }

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toLocaleUpperCase(), url!, true)

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)

    request.onreadystatechange = () => {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())

      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        data: responseData,
        status: request.readyState,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      resolve(response)
    }

    request.onerror = () => {
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = () => {
      reject(
        createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
      )
    }
  })
}
