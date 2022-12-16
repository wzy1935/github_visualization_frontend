import axios from 'axios'
import cookie from 'cookie'
import api from './api'
import { BASE_URL } from './request'

export default {
  toTimeStamp: function toTimestamp(str) {
    return new Date(str).valueOf()
  },

  toDayStr: function toDayStr(timestamp) {
    let t = new Date(timestamp)
    return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate()
  },

  toMinuteStr: function toMinuteStr(timestamp) {
    let t = new Date(timestamp)
    return this.toDayStr(timestamp) + ' ' + t.getHours() + ':' + t.getMinutes()
  },

  getToken: function getToken() {
    if(localStorage.getItem('github_token') == null) {
      let cookies = cookie.parse(document.cookie)
      if (cookies['github_token'] == null) {
        return null
      } else {
        localStorage.setItem('github_token', cookies['github_token'])
      }
    }
    return localStorage.getItem('github_token')
  },

  verifyToken: async function verifyToken(token) {
    if (token == null || token == '') return false 
    try {
      await axios.get('https://api.github.com/rate_limit', {
        headers: {'Authorization': 'Bearer ' + token}
      })
      return true
    } catch(error) {
      return false
    }
  },

  jumpAuth: async function jumpAuth() {
    let resp = await api.authCode()
    if (resp.code == 0) {
      let code = resp.data
      window.location.href = "https://github.com/login/oauth/authorize?client_id=" + code
    }
  }

}