import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import service from "./service"

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 给请求头设置token
    // if (token) {
    //   config.headers!.Authorization = `baseUrl ${token}`;
    // }
    return config
  },
  (error: AxiosError) => {
    // ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 根据自定义错误码判断请求是否成功
    const { status, message } = response.data
    if (status === 200) {
      // 将组件用的数据返回
      return response.data
    } else {
      // 处理业务错误。
      // ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = ''
    // HTTP 状态码
    const status = error.response?.status
    switch (status) {
      case 401:
        message = 'token失效，请重新登录'
        // 这里可以触发退出的 action
        break
      case 403:
        message = '没有权限,请获取权限后登录'
        break
      case 404:
        message = '页面不存在'
        break
      case 500:
        message = '服务器故障'
        break
      case 502:
        message = '数据库查询错误'
        break
      default:
        message = '网络连接错误'
    }
    // ElMessage.error(message)
    return Promise.reject(error)
  }
)

export default service
