import axios from 'axios'
import Cookies from 'js-cookie'
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
      
      if (Cookies.get('github_token') == null) {
        return null
      } else {
        localStorage.setItem('github_token', Cookies.get('github_token'))
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

  getUser: async function getUser(token) {
    if (token == null || token == '') return null 
    try {
      let resp = await axios.get('https://api.github.com/user', {
        headers: {'Authorization': 'Bearer ' + token}
      })
      return {
        'name': resp.data.login,
        'id': resp.data.id
      }
    } catch(error) {
      return null
    }
  },

  jumpAuth: async function jumpAuth() {
    let resp = await api.authCode()
    if (resp.code == 0) {
      let code = resp.data
      window.location.href = "https://github.com/login/oauth/authorize?client_id=" + code
    }
  },

  deAuth: function deAuth() {
    Cookies.remove('github_token')
    localStorage.removeItem('github_token')
  },

  throttle:  (fn, threshhold = 1000) => {
    let last, deferTimer
    return (a) => {
      const _this = this, args = a
      let now = +new Date()
      if(last && now < last + threshhold) {
        clearTimeout(deferTimer)
        deferTimer = setTimeout(function () {
            last = now
            fn.call(_this, args)
          }, threshhold)
      } else {
         last = now
           fn.call(_this, args)
      }
    }
  }

}