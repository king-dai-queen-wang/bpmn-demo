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

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './css/app.css'
import VueClipboard from "vue-clipboard2";

window.$ = $;
Vue.use(ElementUI).use(VueClipboard);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
