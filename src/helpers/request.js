import axios from 'axios'
import baseURLConfig from './config-baseURL'
import {Message} from "element-ui";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'//所有POST请求设置
axios.defaults.baseURL = baseURLConfig.baseURL  //服务端域名,把域名配置到baseURL里面，发请求时直接写后面的后缀就可以了
axios.defaults.withCredentials = true //表示是否跨域请求

export default function request(url, type = 'GET', data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
      validateStatus(status) {
        return (status >= 200 && status < 300) || status === 400
      }
    }
    if (type.toLowerCase() === 'get') {
      option.params = data
    } else {
      option.data = data
    }
    axios(option).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        Message.error(res.data.msg)
      }
    }).catch(err => {
      Message.error('网络异常')
      reject({msg:'网络异常'})
    })
  })
}
