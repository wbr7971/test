// 入口文件
console.log('ready！go')

import Vue from 'vue'

import app from './App.vue'

import { Header } from 'mint-ui'
Vue.component(Header.name, Header)
// Vue.use(Header)

// 导入MUI
import './lib/mui/css/mui.css'

var vm = new Vue({
    el: '#app',
    render: c=>c(app)
})