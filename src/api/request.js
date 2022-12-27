import axios from 'axios'

// export const BASE_URL = 'http://localhost:8080/api' // local only
// export const BASE_URL = 'https://mock.apifox.cn/m1/1936207-0-default/api' // mock only
export const BASE_URL = '/api' // production only

let req = axios.create({
  baseURL: BASE_URL
})


export default req