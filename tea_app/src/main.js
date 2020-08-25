import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/icon/iconfont'
import './assets/icon/icon.css'

Vue.config.productionTip = false

// 导入 Vant-UI
import Vant from 'vant'
// 导入Vant-Ui的样式表文件
import 'vant/lib/index.css'
// 注册为插件
Vue.use(Vant);

// 导入 Mint-Ui
import MintUI from 'mint-ui'
//导入Mint UI的样式表文件(library,库)
import 'mint-ui/lib/style.min.css'
//通过Vue.use()方法注册为插件
Vue.use(MintUI)

// 全局 引入 axios 使用方法
import Axios from 'axios'
// 将 axios 放到 原型链上 供全局使用
Vue.prototype.axios = Axios
// 全局 配置 axios 默认地址
Axios.defaults.baseURL = 'http://127.0.0.1:9850'

// 全局 引入 qs 使用方法
import qs from 'qs'
Vue.prototype.qs = qs

// 全局配置 headers, 设置数据 以 from-data 格式传输
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
