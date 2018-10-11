/*
 * @Author: FT.FE.Bolin
 * @Date: 2018-04-11 17:10:13
 * @Last Modified by: FT.FE.Bolin
 * @Last Modified time: 2018-10-11 18:30:41
 */

import axios from 'axios'

/* 创建axios实例 */
const service = axios.create({
  baseURL: 'http://example.bolin.com/'
})

/* axios请求体包装 */
const responseMehod = (response, resolve, reject) => {
  const res = response.data
  if (res.code * 1 === 0) {
    return resolve(res)
  }
  return reject('error')
}

const judgeMethod = (url, params, options = {
  method: 'post'
}) => {
  let method = options.method || 'post'
  const requestBody = {
    method,
    url,
    ...options
  }
  if (method.toUpperCase() === 'POST') {
    requestBody.data = params
  } else {
    requestBody.params = params
  }
  return new Promise((resolve, reject) => {
    service(requestBody).then(response => {
      responseMehod(response, resolve, reject)
    })
  })
}

export const fetch = judgeMethod
