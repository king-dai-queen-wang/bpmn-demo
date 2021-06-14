<template>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="常规" name="first">
          <el-form-item label="编号" required>
            <el-input v-model= "id"></el-input>
          </el-form-item>
          <el-form-item label="名称" required>
            <el-input v-model= "name"></el-input>
          </el-form-item>
          <el-form-item label="文档" v-show="false">
            <el-input type="textarea" v-model="documentation"></el-input>
          </el-form-item>
          <el-form-item label="多实例类型">
            <el-select v-model= "multiinstance_type"> <!--相当于bpmn2.0标准中的isSequential-->
              <el-option label="非多实例" value="None"></el-option>
              <el-option label="同时进行" value="Parallel"></el-option>
              <el-option label="顺序进行" value="Sequential"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="基数 (多实例)" v-show="false"><!--后端暂时没用到-->
            <el-input v-model= "multiinstance_cardinality" type="number"></el-input>
          </el-form-item>
          <el-form-item label="元素的变量(多实例)" v-show="false"><!--后端暂时没用到-->
            <el-input v-model= "multiinstance_variable" ></el-input>
          </el-form-item>
          <el-form-item label="通过权重[1-100]">
            <el-input v-model= "multiinstance_condition" type="number"></el-input>
          </el-form-item>
          <el-form-item label="表单标识"  required>
            <el-input v-model= "formKey" readonly></el-input>
          </el-form-item>
          <el-form-item label="任务派遣">
            <el-select v-model= "candidateGroups" multiple filterable placeholder="请选择">
              <el-option
                  v-for=" p in positions"
                  :key="p.id"
                  :label="p.name"
                  :value="p.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审批人" required="">
            <el-input  v-model="assignee"></el-input>
          </el-form-item>
          <el-form-item label="组任务候选人" required="">
            <el-input  v-model="candidateUsers"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="监听" name="second">
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
            <el-input v-model="listenerValue"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

    </div>
</template>
<script>
import elementHelper from "../js/helper/ElementHelper";

const forEach = require('lodash/forEach');
import {findObjFromArrayByField,isNeedUpdate} from '../js/util/CommonUtils'; 
import bpmnHelper from '../js/helper/BpmnHelper';
import {NodeTypeMap,TxTypeMap} from '../../static/js/static'; 
// 用户任务属性组件
export default {
    props:['element'],
    inject: ['bpmnModeler'],
    data(){
        return {
            activeName: 'first',
            modeling: null,
            id: this.element.id || '',
            name: '',
            formKey:'',
            documentation: '',
            multiinstance_type: '',
            multiinstance_collection: '',
            multiinstance_condition: '',
            multiinstance_cardinality: null,
            multiinstance_variable: null,
            assignee:'',
            candidateUsers:'',
            // 原子节点属性
            
            positions:[],
            priority:'',
            candidateGroups: '没有受让人',
            eventType: [],
            listenerType: '',
            listenerValue: '',
            listenerValueLabel: 'Java类'
        }
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    mounted() {
        const bpmnModeler = this.bpmnModeler();
        this.modeling = bpmnModeler.get('modeling');
    },
    //监视器
    watch:{
        name: {
            handler(newVal, oldVal) {
                this.modeling.updateProperties(this.element,{
                    name: newVal
                });
            }
        },
       
        //监视元素变化
        element:{
            deep: true,
            immediate: true, 
             handler(newVal,oldVal){
                 if(newVal.type == 'bpmn:UserTask') {
                     const bpmnModeler = this.bpmnModeler();
                     const modeling = bpmnModeler.get('modeling');
                     const businessObject = newVal.businessObject;
                     this.id = businessObject.id;
                     this.name = businessObject.name;
                     if (Array.isArray(businessObject?.extensionElements?.values)) {
                       const values = businessObject.extensionElements.values;
                       this.eventType = values.map(value => value.event || value.$attrs.event) || [];

                       this.listenerType = ['class',
                         'expression',
                         'delegateExpression',
                         'script',].filter(listenerType => {
                         return Reflect.has(values[0], listenerType) || Reflect.has(values[0].$attrs, listenerType);
                       })[0] || '';

                       this.listenerValue = values[0][this.listenerType] || values[0].$attrs[this.listenerType];

                     }

                     this.formKey = businessObject.get('formKey');
                     // 原子
                     const candidateGroupsTemp = businessObject.get('candidateGroups');
                     // 解决后端反显和切换节点反显candidateGroupsTemp类型不一致问题
                    if(candidateGroupsTemp && candidateGroupsTemp.length > 0) {
                        if(Array.isArray(candidateGroupsTemp)) {
                            //切换节点反显
                            this.candidateGroups = businessObject.get('candidateGroups');
                        } else {
                            //后端反显
                            this.candidateGroups = businessObject.get('candidateGroups').split(',');
                        }
                        
                    }

                     this.multiinstance_type = businessObject.get('multiinstance_type') || 'None';
                     this.multiinstance_condition = businessObject.get('multiinstance_condition') || '';
                     this.assignee=businessObject.get('assignee')||'';
                     this.candidateUsers=businessObject.get('candidateUsers')||'';
                     modeling.updateProperties(newVal,{'multiinstance_type':this.multiinstance_type});
                     modeling.updateProperties(newVal,{'multiinstance_condition':this.multiinstance_condition});
                     modeling.updateProperties(newVal,{'assignee':this.assignee});
                     modeling.updateProperties(newVal,{'candidateUsers':this.candidateUsers});
                 }
             }
        },
        formKey:{
            handler(newVal,oldVal){
                this.modeling.updateProperties(this.element,{'formKey':newVal});
            }
        },
        multiinstance_type: {
            handler(newVal, oldVal) {
                this.modeling.updateProperties(this.element,{'multiinstance_type':newVal});
            }
        },
        multiinstance_collection: {
            handler(newVal, oldVal) {
                this.modeling.updateProperties(this.element,{'multiinstance_collection':newVal});
            }
        },
        multiinstance_condition: {
            handler(newVal, oldVal) {
                this.modeling.updateProperties(this.element,{'multiinstance_condition':newVal});
            }
        },
        priority: {
            handler(newVal, oldVal) {
                this.modeling.updateProperties(this.element,{'priority':newVal});
            }
        },
        candidateGroups: {
            handler(newVal,oldVal){
                console.log("aa")
                this.modeling.updateProperties(this.element,{'candidateGroups':newVal});
                
            }
        },
        assignee:{
             handler(newVal,oldVal){
                this.modeling.updateProperties(this.element,{'assignee':newVal});
                
            }
        },
         candidateUsers:{
             handler(newVal,oldVal){
                this.modeling.updateProperties(this.element,{'candidateUsers':newVal});
                
            }
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

    }
   
}
</script>
<style>

</style>