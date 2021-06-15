
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MyExample from '../views/MyExample.vue'
import baseEditor from '../components/my-example/example-editor-base/example-base-editor'
import baseViewer from '../components/my-example/example-viewer/example-viewer'
import customerPalette from '../components/my-example/customer-pattle/customer-palette'
import customerContextPad from '../components/my-example/customer-context-pad/customer-context-pad'
import CustomerPropertyPanel from '../components/my-example/customer-property-panel/customer-property-panel'
import CustomerActivitiPanel from '../components/my-example/customer-activiti-panel/customer-activiti-panel';
import CustomerActivitiPanelV2 from '../components/my-example/customer-property-panel-v2/customer-activiti-panel-v2'
import YiyangBPMN from "../views/YiyangBPMN";
import Modeler from "../components/yiyang-activiti/edit-modeler/components/Modeler";
import Viewer from "../components/yiyang-activiti/edit-modeler/components/Viewer";
import bpmn from "../components/bpmn/bpmn";
import zjmzxfzhlBpmn from "../views/zjmzxfzhlBpmn";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/camunda',
    name: 'camunda',
    component: bpmn
  },
  {
    path: '/yiyang-activiti',
    name: 'yiyang',
    component: YiyangBPMN,
    children: [
      {
        path: '/',
        name: 'Modeler1',
        component: Modeler
      },
      {
        path: '/edit-modeler/modeler',
        name: 'Modeler',
        component: Modeler

      },
      {
        path: '/edit-modeler/viewer',
        name: 'Viewer',
        component: Viewer

      }
    ]
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
    }, {
      path: 'customer-property-panel',
      name: 'customer-property-panel',
      component: CustomerPropertyPanel
    }, {
      path: 'customer-activiti-panel',
      name: 'customer-activiti-panel',
      component: CustomerActivitiPanel
    },
      {
        path: 'customer-property-panel-v2',
        name: 'customer-property-panel-v2',
        component: CustomerActivitiPanelV2
      }],
    component: MyExample
  },
  {
    name: 'zjmzxfzhl-bpmn',
    path:  '/zjmzxfzhl-bpmn',
    component: zjmzxfzhlBpmn
  }
]

const router = new VueRouter({
  routes
})

export default router
