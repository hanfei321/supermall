import axios from "axios";


export function request(config) {
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/hy66',
    timeout:5000
  })
  instance.interceptors.request.use(config => {
    return config
  },error => {
    console.log(error)
  })

  instance.interceptors.response.use(config => {
    return config.data
  },error => {
    console.log(error)
    if (error && error.response){
      switch (error.response.status){
        case 400:error.message = '请求错误'
          break
        case 401:error.message = '未授权访问'
          break
      }
    }
    return error
  })
  return instance(config)
}
