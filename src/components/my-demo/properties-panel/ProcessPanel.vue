<template>
    <div id="app-container">
      <p>{{ propsComponent }}</p>
      <div id="right" ref="right">

        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane name="first">
            <span slot="label"><i class="el-icon-date" /> 基本信息</span>
            <el-collapse v-model="nodeActiveNames" accordion>
              <el-collapse-item name="process">
                <template slot="title">
                  流程信息<i class="header-icon el-icon-info" />
                </template>
                <el-form
                    :inline="true"
                    :model="processInfo"
                    label-width="auto"
                    size="small"
                >
                  <el-form-item
                      label="名称"
                  >
                    <el-input
                        v-model="processInfo.processName"
                        :disabled="true"
                    />
                  </el-form-item>
                  <el-form-item
                      label="KEY"
                  >
                    <el-input
                        v-model="processInfo.processKey"
                        :disabled="true"
                    />
                  </el-form-item>
                  <el-form-item
                      label="备注"
                  >
                    <el-input
                        v-model="processInfo.remarks"
                        type="textarea"
                        :autosize="{minRows: 4, maxRows:10}"
                        :disabled="true"
                    />
                  </el-form-item>
                </el-form>
              </el-collapse-item>
              <el-collapse-item name="node">
                <template slot="title">
                  节点信息<i class="header-icon el-icon-info" />
                </template>
                <el-form
                    :inline="true"
                    :model="element"
                    label-width="auto"
                    size="small"
                >
                  <el-form-item
                      v-if="selectNode"
                      label="节点ID"
                  >
                    <el-input
                        v-model="element.id"
                        @input="idChange"
                    />
                  </el-form-item>
                  <el-form-item
                      v-if="selectNode"
                      label="节点名称"
                  >
                    <el-input
                        v-model="elementName"
                        @input="nameChange"
                    />
                  </el-form-item>
                </el-form>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane name="second">
            <span slot="label"><i class="el-icon-setting" /> 基础设置</span>

            <div>
              <el-form label-width="auto" size="mini" label-position="top">
                <component :is="propsComponent" :key="key" :element="element" />
              </el-form>
            </div>
          </el-tab-pane>

        </el-tabs>

      </div>
    </div>
  </template>

<script>

import CommonProps from "./props/CommonProps";
import bpmnHelper from "./helper/BpmnHelper";

import EndEventProps from './props/EndEventProps';
import StartEventProps from "./props/StartEventProps";
import UserTaskProps from "./props/UserTaskProps";
import TemplateProps from "./props/TemplateProps";
import SequenceFlowProps from "./props/SequenceFlowProps";
export default {
    name: "ProcessPanel",
    props: {
      bpmnModeler: {
        type: Object,
        required: true
      },
      processInfo: {
        type: Object,
        require: true,
        default: null
      }
    },
    components: {
      CommonProps,
      EndEventProps,
      StartEventProps,
      UserTaskProps,
      TemplateProps,
      SequenceFlowProps
    },
    provide: function() {
      return {
        bpmnModeler: this.getBpmnModeler,
        params: this.params
      }
    },
  watch:{
    propsComponent: {
      handler(newVal,oldVal){
        console.log('propsComponent change', newVal, oldVal)
        if (newVal === undefined) {
          this.propsComponent = oldVal;
        }
      }
    }
  },
    data() {
        return {
          propsComponent: 'CommonProps',
          activeName: 'first',
          nodeActiveNames: ['process', 'node'],
          element: {},
          elementName: '',
          process: {},
          key: '1',
          params: '',
          defaultData: {}
        }
    },
    computed: {
      selectNode() {
        if (!this.element || this.element.id === undefined) {
          return
        }
        return true
      },
    },
    // 生命周期 - 创建完成（可以访问当前this实例）
    created() { 
    
    },
    // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
    mounted() {
      console.log(this.processInfo);
      this.handleModeler();
      this.bingShapeEvent();
      this.bindingElementEvent();

    },
    methods: {
      initCDATA(shape) {
        const reg = /<!\[CDATA\[(.+)\]\]>/;
        const str = shape.businessObject.conditionExpression?.body;
        if (str && reg.test(str) === false) {
          const newCondition = this.bpmnModeler.get('moddle')
              .create('bpmn:FormalExpression', {body: `<![CDATA[${str}]]>`})
          this.bpmnModeler.get('modeling').updateProperties(shape, {conditionExpression: newCondition})
        }
      },
      setDefaultProperties() {
        const that = this
        const { element } = that
        if (element) {
          // 这里可以拿到当前点击的节点的所有属性
          const { type, businessObject } = element
          const { name } = businessObject
          if (that.verifyIsEvent(type)) {
            const eventType = businessObject.eventDefinitions ? businessObject.eventDefinitions[0]['$type'] : ''
            console.log(eventType)
          } else if (that.verifyIsTask(type)) {
            const taskType = type
            console.log(taskType)
          }

          that.element['name'] = name || that.defaultData[element.type]
        }
      },
      // 判断是否是事件节点
      verifyIsEvent(type) {
        return type.includes('Event')
      },
      // 判断是否是task节点
      verifyIsTask(type) {
        return type.includes('Task')
      },
      isInvalid(param) { // 判断是否是无效的值
        return param === null || param === undefined || param === ''
      },
      isSequenceFlow(type) { // 判断是否是线
        return type === 'bpmn:SequenceFlow'
      },
      getShape(id) {
        var elementRegistry = this.bpmnModeler.get('elementRegistry')
        return elementRegistry.get(id)
      },
      getBpmnModeler() {
        return this.bpmnModeler
      },
      idChange(id) {
        const modeling = this.modeler.get('modeling')
        modeling.updateProperties(this.element, { id: id })
      },
      // 属性面板名称，更新回流程节点
      nameChange(name) {
        const modeling = this.bpmnModeler.get('modeling')
        modeling.updateLabel(this.element, name)
      },
      handleModeler() {
        // 监听节点选择变化,不会监听流程图的变化
        // 监听 element
        const that = this
        that.element = that.bpmnModeler.get('canvas').getRootElement()
      },
      elementChanged(e) {
        console.log('element change', e)
        const id = e.element.id; // .replace('_label', '')
        var shape = this.getShape(id)

        const that = this

        if (!shape) {
          // 若是shape为null则表示删除, 无论是shape还是connect删除都调用此处
          console.log('无效的shape')
          // 上面已经用 shape.removed 检测了shape的删除, 要是删除shape的话这里还会被再触发一次
          console.log('删除了shape和connect')
          return
        }
        const { element } = e
        if (!element || element === undefined) return

        console.log('element.changed:' + JSON.stringify(element))
        // element.businessObject.name
        /*if (element.type === 'bpmn:SequenceFlow') {
          that.elementName = element.name
        } else if(element.type === 'label') {

        } else {
          // that.elementName = element.businessObject.name
        }*/
        if (!that.isInvalid(shape.type)) {
          that.element = e.element

          if (that.isSequenceFlow(shape.type)) {
            console.log('改变了线')
          } else {
            that.setDefaultProperties()
          }
        }
      },
      bindingElementEvent() {
        const that = this
        const eventBus = that.bpmnModeler.get('eventBus')
        const eventTypes = ['element.click', 'element.changed', 'selection.changed']

        eventTypes.forEach(function(eventType) {
          eventBus.on(eventType, function(e) {
            // that.bpmnModeler.get('comments').collapseAll()
            // that.bpmnModeler.get('comments').toggleCollapse(that.element)
            if (eventType === 'element.changed') {
              that.elementChanged(e)
            } else if (eventType === 'selection.changed') {
              const element = e.newSelection[0]
              if (!element || element === undefined) return
              that.element = element
            } else if (eventType === 'element.click') { // 点击事件
              if (!e || e.element.type === 'bpmn:Process') {
                // 如果是点到 process 的时候
                console.log('e.element.type:' + e.element.type)
                that.key = '1'
                that.propsComponent = 'CommonProps'
                that.element = e.element
              } else {
                // 点击shape
                console.log('element click', e)
                // 展示新增图形的属性
                that.key = e.element.id
                // 根据点击元素的类型来判断展示什么样子的property组件
                that.propsComponent = bpmnHelper.getComponentByEleType(e.element.type)
                // 如果找不到对应组件则展示TemplateProps
                if (!that.propsComponent) {
                  that.propsComponent = 'TemplateProps'
                }
                console.log(that.propsComponent)
                that.element = e.element;
                that.elementName = e.element.name || e.element.businessObject.name || '';
              }
            }

          })
        })
      },
      bingShapeEvent() {
        const _this = this;
        const eventBus = this.bpmnModeler.get('eventBus')
        // 监听流程图事件
        const events = [
          // 'element.click',
          // 'element.dblclick',
          'shape.added',
          'shape.move.end',
          'connection.removed',
          'shape.removed',
          'connection.added'
          // 'commandStack.shape.create.postExecuted',
          // 'commandStack.shape.remove.postExecuted',
          // 'commandStack.connection.create.postExecuted',
          // 'commandStack.connection.remove.postExecuted'

          /*   'element.hover',
            'element.out',
            'element.mousedown',
            'element.mouseup' */
        ]
        events.forEach(function(event) {
          eventBus.on(event, function(e) {
            var elementRegistry = _this.bpmnModeler.get('elementRegistry')
            var shape = e.element ? elementRegistry.get(e.element.id) : e.shape

            switch (event) {
              case 'shape.added':
                console.log('新增了shape')
                // 展示新增图形的属性
                _this.key = e.element.id; // .replace('_label', '')
                _this.propsComponent = bpmnHelper.getComponentByEleType(shape.type)
                _this.element = e.element

                break
              case 'shape.move.end':
                console.log('移动了shape')
                // 展示新增图形的属性
                _this.key = shape.id
                _this.propsComponent = bpmnHelper.getComponentByEleType(shape.type)
                _this.element = e.shape
                break
              case 'connection.added':
                _this.initCDATA(shape);
                break
              case 'shape.removed':
                // 展示默认的属性
                _this.propsComponent = 'CommonProps'

                break
              case 'connection.removed':
                break
              default:
                break
            }
          })
        })
      }
    }
}
</script>

<style scoped>

</style>