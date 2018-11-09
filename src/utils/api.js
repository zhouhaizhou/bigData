import axios from 'axios'
import store from '../store/index.js'
var root = process.env.API_ROOT;
axios.defaults.withCredentials=true
axios.defaults.baseURL=root;
//添加请求拦截器
axios.interceptors.request.use(
  function(config) {
      // 请求头添加token
      if (store.state.UserToken) {
          config.headers.Authorization = store.state.UserToken.Account
      }
      return config
  },
  function(error) {
      return Promise.reject(error)
  }
)