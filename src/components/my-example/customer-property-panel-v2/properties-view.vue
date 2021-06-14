<template>
  <div class="custom-properties-panel">
<!--    `selectedElements`的判断.
这是因为我们在操作图形的时候,
如果你使用`command + 左键`(window上应该是`Ctrl`?)是可以选择多个节点的,
 这时候就需要做一个判断.-->
    <div class="empty" v-if="selectedElements.length<=0">请选择一个元素</div>
    <div class="empty" v-else-if="selectedElements.length>1">只能选择一个元素</div>

    <div v-else>
<!--      element id -->
      <fieldset class="element-item">
        <label>id</label>
        <span>{{ element.id }}</span>
      </fieldset>
<!--      设置元素名称-->
      <fieldset class="element-item">
        <label>name</label>
        <input :value="element.name" @change="(event) => changeField(event, 'name')" />
      </fieldset>
<!--      设置额外属性-->
      <fieldset class="element-item">
        <label>customProps</label>
        <input :value="element.name" @change="(event) => changeField(event, 'customProps')" />
      </fieldset>
<!--       设置节点颜色-->
      <fieldset class="element-item">
        <label>节点颜色</label>
        <input type="color" :value="element.color" @change="(event) => changeField(event, 'color')" />
      </fieldset>
<!--设置节点类型-->
      <fieldset class="element-item" v-if="isEvent">
        <label>修改event节点类型</label>
        <select @change="changeEventType" :value="eventType">
          <option
              v-for="option in eventTypes"
              :key="option.value"
              :value="option.value"
          >{{ option.label }}</option>
        </select>
      </fieldset>
<!--设置task节点类型-->
      <fieldset class="element-item" v-if="isTask">
        <label>修改Task节点类型</label>
        <select @change="changeTaskType" :value="taskType">
          <option
              v-for="option in taskTypes"
              :key="option.value"
              :value="option.value"
          >{{ option.label }}</option>
        </select>
      </fieldset>
    </div>
  </div>
</template>

<script>
export default {
  name: "PropertiesView",
  props: {
    modeler: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      selectedElements: [], // 当前选择的元素集合
      element: null, // 当前点击的元素
      eventTypes: [
        { label: '默认', value: '' },
        { label: 'MessageEventDefinition', value: 'bpmn:MessageEventDefinition' },
        { label: 'TimerEventDefinition', value: 'bpmn:TimerEventDefinition' },
        { label: 'ConditionalEventDefinition', value: 'bpmn:ConditionalEventDefinition' }
      ],
      eventType: '',
      taskTypes: [
        { label: 'Task', value: 'bpmn:Task' },
        { label: 'ServiceTask', value: 'bpmn:ServiceTask' },
        { label: 'SendTask', value: 'bpmn:SendTask' },
        { label: 'UserTask', value: 'bpmn:UserTask' }
      ],
      taskType: ''
    }
  },
  created () {
    this.init()
  },
  methods: {
    /**
     * 更新元素属性
     * @param properties { Object } 要更新的属性, 例如 { name: '', id: '' }
     */
    updateProperties(properties) {
      const { modeler, element } = this
      const modeling = modeler.get('modeling')
      modeling.updateProperties(element, properties)
    },
    setDefaultProperties() {
      const { element } = this
      if (element) {
        const { type, businessObject } = element
        // 同步 shape 里的name 到element 的name
        element['name'] = businessObject.name;

        if (this.verifyIsEvent(type)) { // 若是event类型
          // 获取默认的 eventDefinitionType
          this.eventType = businessObject.eventDefinitions ? businessObject.eventDefinitions[0]['$type'] : ''
        }

        if (this.verifyIsTask(type)) { // 若是task类型
          // 获取默认的 eventDefinitionType
          this.taskType = type;
        }
      }
    },
    init () {
      const { modeler } = this // 父组件传递进来的 modeler
      modeler.on('selection.changed', e => {
        this.selectedElements = e.newSelection // 数组, 可能有多个
        this.element = e.newSelection[0] // 默认取第一个
        this.setDefaultProperties() // 设置一些默认的值
      })
      modeler.on('element.changed', e => {
        const { element } = e
        const { element: currentElement } = this
        if (!currentElement) {
          return
        }
        // update panel, if currently selected element changed
        if (element.id === currentElement.id) {
          this.element = element
        }
      })
    },
    /**
     * 改变控件触发的事件
     * @param event { Object } input的Event
     * @param type { String } 要修改的属性的名称
     */
    changeField(event, type) {
      const value = event.target.value
      let properties = {}
      properties[type] = value
      if (type === 'color') { // 若是color属性
        this.onChangeColor(value)
      }
      this.element[type] = value
      this.updateProperties(properties)
    },
    onChangeColor(color) {
      const { modeler, element } = this
      const modeling = this.modeler.get('modeling')
      modeling.setColor(element, {
        fill: color,
        stroke: null
      })
    },

    verifyIsEvent (type) { // 判断类型是不是event
      return type.includes('Event')
    },

    verifyIsTask(type) {
      return type.includes('Task')
    },
    changeTaskType(event) {
      const { modeler, element } = this
      const value = event.target.value // 当前下拉框选择的值
      const bpmnReplace = modeler.get('bpmnReplace')
      bpmnReplace.replaceElement(element, {
        type: value // 直接修改type就可以了
      })
    },

    changeEventType(event) { // 改变下拉框
      const { modeler, element } = this
      const value = event.target.value
      const bpmnReplace = modeler.get('bpmnReplace')
      this.eventType = value
      bpmnReplace.replaceElement(element, {
        type: element.businessObject.$type,
        eventDefinitionType: value
      })
    },
  },
  computed: {
    isEvent() { // 判断当前点击的element类型是不是event
      const { element } = this
      return this.verifyIsEvent(element.type)
    },
    isTask() { // 判断当前点击的element类型是不是task
      const { element } = this
      return this.verifyIsTask(element.type)
    }
  }
}
</script>

<style scoped>

</style>