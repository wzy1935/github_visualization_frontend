import axios from 'axios'

let req = axios.create({
  // baseURL: 'http://localhost:8080/api'
  baseURL: 'https://mock.apifox.cn/m1/1936207-0-default/api'
})


export default req