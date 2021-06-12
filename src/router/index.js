import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyExample from '../views/MyExample.vue'
import baseEditor from '../components/my-example/example-editor-base/example-base-editor'
import baseViewer from '../components/my-example/example-viewer/example-viewer'
import customerPalette from '../components/my-example/customer-pattle/customer-palette'
import customerContextPad from '../components/my-example/customer-context-pad/customer-context-pad'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dww-example',
    name: 'dww-example',
    children: [{
      path: 'base-viewer',
      name: 'viewer',
      component: baseViewer
    }, {
      path: 'base-editor',
      name: 'base',
      component: baseEditor
    }, {
      path: 'customer-palette',
      name: 'customer-palette',
      component: customerPalette
    }, {
      path: 'customer-context-pad',
      name: 'customer-context-pad',
      component: customerContextPad
    }],
    component: MyExample
  }
]

const router = new VueRouter({
  routes
})

export default router
