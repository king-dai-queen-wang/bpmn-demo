import Vue from 'vue'
import App from './App.vue'
import router from './router'
import $ from "jquery" //加上这句话
import store from './store/index'
// bpmn 相关依赖
import 'bpmn-js/dist/assets/diagram-js.css' 
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css'
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'

// 左边工具栏以及编辑节点的样式
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'

// 引入elementUI
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

import VueClipboard from "vue-clipboard2";
// i18n
import i18n from '@/components/bpm-web-ui/lang' // internationalization
import '@/components/bpm-web-ui/icons' // icon
// 自定义表格工具扩展
import RightToolbar from '@/components/bpm-web-ui/RightToolbar'
// 引入自定义全局css
import './css/app.css'
// 引入jquery
window.$ = $;

Vue.component('RightToolbar', RightToolbar)
Vue.use(ElementUI).use(VueClipboard);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
