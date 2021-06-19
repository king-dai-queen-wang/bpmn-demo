<template>
  <div>
    <div>
      <el-collapse
        v-model="activeName"
        accordion
      >
        <el-collapse-item name="1">
          <template slot="title">
            节点设置<i class="header-icon el-icon-info" />
          </template>
          <div>
            <el-form
              :inline="true"
              label-width="100px"
              size="small"
            >
              <el-form-item label="编号">
                <el-input
                  v-model="id"
                  disabled
                />
              </el-form-item>
              <el-form-item
                label="名称"
                required
              >
                <el-input v-model="name"/>
              </el-form-item>

              <el-form-item label="文档">
                <el-input
                  v-model="documentation"
                  type="textarea"
                  @change="updatePropertyValue().updateDocumentation($event)"
                />
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
         <el-collapse-item name="4">
          <template slot="title">
            节点事件<i class="header-icon el-icon-info" />
          </template>
          <div>
            <el-form-item label="事件类型" >
              <el-select v-model="eventType" placeholder="请选择" multiple>
                <el-option label="开始" value="start"></el-option>
                <el-option label="结束" value="complete"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="监听器类型">
              <el-select v-model="listenerType" placeholder="请选择">
                <el-option label="java类" value="class"></el-option>
                <el-option label="表达式" value="expression"></el-option>
                <el-option label="代理表达式" value="delegateExpression"></el-option>
                <el-option label="脚本" value="script"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-bind:label="listenerValueLabel">
              <el-input v-model="listenerValue"
                        @input="updatePropertyValue().updateEventListener($event)"></el-input>
            </el-form-item>
          </div>
        </el-collapse-item>
      </el-collapse>

    </div>

<!--    <div>
      <el-dialog
        :title="selectFormDialog.title"
        :visible.sync="selectFormDialog.visible"
        :width="selectFormDialog.width"
        :fullscreen="selectFormDialog.fullscreen"
        :close-on-press-escape="selectFormDialog.closeOnPressEscape"
        append-to-body
        center
        :before-close="handleClose"
        @close="closeSelectFormDialog"
      >
&lt;!&ndash;        <selectForm
          ref="selectForm"
          @setForm="setForm"
        />&ndash;&gt;
      </el-dialog>

      <el-dialog
        v-if="selectNodeUserDialog.visible"
        :width="selectNodeUserDialog.width"
        :title="selectNodeUserDialog.title"
        :visible.sync="selectNodeUserDialog.visible"
        append-to-body
        :before-close="handleClose"
      >
        <div>
          <select-user
            v-if="selectNodeUserDialog.visible"
            ref="selectUser"
            :visible.sync="selectNodeUserDialog.visible"
            :default-users.sync="defaultSelectedUsers"
            @save="saveNodeUser"
            @close="closeNodeUser"
          />
        </div>
      </el-dialog>
    </div>-->
  </div>
</template>

<script>


// 用户任务属性组件
import BpmnHelper from "../helper/BpmnHelper";
import elementHelper from "../../../yiyang-activiti/edit-modeler/js/helper/ElementHelper";
let _this = null;
export default {
  // components: {  selectUser },
  props: ['element'],
  inject: ['bpmnModeler'],
  data() {
    return {
      moddle: null,
      modeling: null,
      bpmnModelerInstance: null,
      elementRegistry: null,
      id: this.element.id || '',
      name: '',
      documentation: '',
      activeName: '1',
      // 监听
      eventType: [],
      listenerType: '',
      listenerValue: '',
      listenerValueLabel: 'Java类'
    }
  },
  watch: {
    name: {
      handler(newVal, oldVal) {
        this.modeling.updateLabel(this.element, newVal)
        this.modeling.updateProperties(this.element, {
          name: newVal
        })
      }
    },
    element: {//深度监听，可监听到对象、数组的变化
      deep: true, //true 深度监听
      immediate: true,
      handler(val, oldVal){
        this.initPropertyValues?.(val);
      },
    },
    listenerType(newVal, oldVal){
      if(newVal === 'class') {
        this.listenerValueLabel = 'java类'
      } else if(newVal === 'expression') {
        this.listenerValueLabel = '表达式'
      } else if(newVal === 'delegateExpression') {
        this.listenerValueLabel = '代理表达式'
      }
    },
    listenerValue(newVal, oldVal){
      if(newVal) {
        const bpmnModeler = this.bpmnModeler();
        const bpmnFactory = bpmnModeler.get('bpmnFactory');
        let extensionElements = this.element.businessObject.get('extensionElements');
        if(!extensionElements) {
          extensionElements = elementHelper.createElement('bpmn:ExtensionElements', null, this.element, bpmnFactory);
        }
        const length = extensionElements.get('values').length;
        for (let i = 0; i < length; i++) {
          // 清除旧值
          extensionElements.get('values').pop();
        }
        this.eventType.forEach(evt => {
          const executionListener = elementHelper.createElement('activiti:ExecutionListener', null, this.element, bpmnFactory);
          executionListener.$attrs['event'] = evt;
          executionListener.$attrs[this.listenerType] = newVal;
          extensionElements.get('values').push(executionListener)

        });
        const modeling = bpmnModeler.get('modeling');
        modeling.updateProperties(this.element, {
          extensionElements: extensionElements
        })
      }
    },
  },
  mounted() {
  },
  created() {
    const bpmnModeler = this.bpmnModeler();
    this.modeling = bpmnModeler.get('modeling')
    _this = this;
    // this.bpmnModelerInstance = bpmnModeler;
    // this.modeling = bpmnModeler.get('modeling')
    // this.moddle = bpmnModeler.get('moddle');
    // this.elementRegistry = this.bpmnModelerInstance.get('elementRegistry')
  },
  methods: {
    initPropertyValues(val) {
      var init = {
        initName() {
          this.name = val.businessObject.name;
        },
        initDocument() {
          this.documentation = val.businessObject?.documentation?.length ? val.businessObject.documentation[0].text : '';
        },
        initTaskListener() {
          if (Array.isArray(val.businessObject?.extensionElements?.values)) {
            const values = val.businessObject.extensionElements.values;
            this.eventType = values.map(value => value.event || value.$attrs.event) || [];

            this.listenerType = [
              'class',
              'expression',
              'delegateExpression',
              'script'
            ].filter(listenerType => {
              if (Reflect.ownKeys(values[0].$attrs).length) {
                return Reflect.has(values[0].$attrs, listenerType)
              }
              return Reflect.has(values[0], listenerType);
            })[0] || '';

            this.listenerValue = values[0][this.listenerType] || values[0].$attrs[this.listenerType] || '';

          }
        }
      };
      init.initName.call(this);
      init.initDocument.call(this);
      init.initTaskListener.call(this);
    },
    updatePropertyValue() {
      return {
        updateDocumentation(value) {
          BpmnHelper.updateDocumentation(_this.bpmnModeler(), _this.element, value);
        },
        updateEventListener(value) {
          if (!value) {
            return;
          }
          const bpmnModeler = _this.bpmnModeler();
          const bpmnFactory = bpmnModeler.get('bpmnFactory');
          let extensionElements = _this.element.businessObject.get('extensionElements');
          if(!extensionElements) {
            extensionElements = elementHelper.createElement('bpmn:ExtensionElements', null, _this.element, bpmnFactory);
          }
          const length = extensionElements.get('values').length;
          for (let i = 0; i < length; i++) {
            // 清除旧值
            extensionElements.get('values').pop();
          }
          _this.eventType.forEach(evt => {
            const executionListener = elementHelper.createElement('activiti:TaskListener', null, _this.element, bpmnFactory);
            executionListener.$attrs['event'] = evt;
            executionListener.$attrs[_this.listenerType] = value;
            extensionElements.get('values').push(executionListener)
          });
          const modeling = bpmnModeler.get('modeling');
          modeling.updateProperties(_this.element, {
            extensionElements: extensionElements
          })
        },
      }
    }
  }

}
</script>
<style>
</style>
