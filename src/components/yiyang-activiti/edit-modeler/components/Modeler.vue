<template>
  <div>
    <el-container style="height: 500px">
<!--      左侧-->
      <el-aside width="80%" hight="100%" style="border: 1px solid #DCDFE6">
<!--         toolbox -->
        <el-button icon="el-icon-info" v-on:click="watchXML" class="watchXml">查看xml</el-button>
        <el-button icon="el-icon-info" @click="saveXML" title="保存为bpmn">保存为BPMN文件</el-button>
        <li>
          <a href="javascript:" @click="$refs.refFile.click()">加载本地BPMN文件</a>
          <input type="file" id="files" ref="refFile" style="display: none" @change="loadXML" />

        </li>
<!--        bpmn 画板-->
        <!-- <el-button icon="el-icon-download" v-on:click="saveSVG" >下载svg</el-button> -->
        <div ref="canvas" style="width: 100%;height: 90%">
        </div>
      </el-aside>
<!-- 右侧属性栏-->
      <el-main style="border: 1px solid #DCDFE6;background-color:#FAFAFA
      ">
        <el-form label-width="50px" size="mini" label-position="ligh">
          {{propsComponent}}
          <!-- 动态显示属性面板 -->
          <component :class="propsComponent" :is="propsComponent" :element= "element" :key= "key"></component>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
import bpmnHelper from '../js/helper/BpmnHelper';
import CommonProps from './CommonProps.vue';
import ProcessProps from './ProcessProps.vue';
import StartEventProps from './StartEventProps.vue';
import EndEventProps from './EndEventProps.vue';
import IntermediateThrowEventProps from './IntermediateThrowEventProps.vue';
import ExclusiveGatewayProps from './ExclusiveGatewayProps.vue';
import ParallelGatewayProps from './ParallelGatewayProps.vue';
import InclusiveGatewayProps from './InclusiveGatewayProps.vue';
import UserTaskProps from './UserTaskProps.vue';
import SequenceFlowProps from './SequenceFlowProps.vue';
import CallActivityProps from './CallActivityProps.vue';
import activitiModdleDescriptor from '../js/activiti.json';
import customTranslate from '../js/customTranslate/customTranslate';
import customControlsModule from '../js/customControls';
import BpmData from "./BpmData";
import request from '../../util/request';
const forEach = require('lodash/forEach');


export default {
  components: {
    CommonProps,
    ProcessProps,
    StartEventProps,
    EndEventProps,
    IntermediateThrowEventProps,
    ExclusiveGatewayProps,
    ParallelGatewayProps,
    InclusiveGatewayProps,
    UserTaskProps,
    SequenceFlowProps,
    CallActivityProps
  },
  props:["params"],
  // provide 提供 被注册的变量， 子、孙组件 inject 注入
  provide: function () {
    return {
      bpmnModeler: this.getBpmnModeler,
      params: this.params
    }
  },
  data () {
    return {
      propsComponent:'CommonProps',
      bpmData: new BpmData(),
      bpmnModeler: null,
      canvas: null,
      element: null,
      key: '',
      defaultData: {
        'bpmn:StartEvent': '交易开始',
        'bpmn:EndEvent':'交易完成',
        'bpmn:IntermediateThrowEvent':'交易终止'

      }
    }
  },
  methods: {
    // 加载xml
    loadXML() {
      const that = this;
      const file = this.$refs.refFile.files[0];

      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {
        that.importBpmnXml(this.result)
      };
    },
      //查看文档
      watchXML() {
        this.bpmnModeler.saveXML({format:true},function(err,xml){
            if(err){
              console.error('流程数据生成失败');
              console.log(err);
              return;
            }
            console.log(xml);

        });
      },
      // 保存xml
      // saveXML(){
      //   const that = this;
      //   that.bpmnModeler.saveXML({format:true},function(err,xml){
      //       if(err){
      //         console.error('流程数据生成失败');
      //         console.log(err);
      //         return;
      //       }
      //       const modelId = '123';
      //       that.bpmnModeler.saveSVG(function(err, svg) {
      //         if(err){
      //           console.error('流程数据生成失败！');
      //           return;
      //         }
      //         const modelId = that.params.row.id;
      //         request({
      //           url: `/workflow/model/${modelId}/xml/save`,
      //           method: 'post',
      //           data: {
      //             bpmn_xml: xml,
      //             svg_xml: svg
      //           }
      //         })
      //         .then(function (response) {
      //           console.log(response);
      //         })
      //         .catch(function (error) {
      //           console.log(error);
      //         });
      //
      //       })
      //
      //   });
      //
      // },
      // 保存图片

    async saveXML() {
      try {
        const result = await this.bpmnModeler.saveXML({ format: true });
        const { xml } = result;

        var xmlBlob = new Blob([xml], {
          type: "application/bpmn20-xml;charset=UTF-8,"
        });

        var downloadLink = document.createElement("a");
        downloadLink.download = "ops-coffee-bpmn.bpmn";
        downloadLink.innerHTML = "Get BPMN SVG";
        downloadLink.href = window.URL.createObjectURL(xmlBlob);
        downloadLink.onclick = function(event) {
          document.body.removeChild(event.target);
        };
        downloadLink.style.visibility = "hidden";
        document.body.appendChild(downloadLink);
        downloadLink.click();
      } catch (err) {
        console.log(err);
      }
    },
      saveSVG(call){
        this.bpmnModeler.saveSVG(function(err,xml){
            if(err){
              console.error('流程数据生成失败！');
              return;
            }
            call(xml);
        })
      },
      //初始化BpmnModeler
      initBpmnModeler(){
        let canvas = this.$refs.canvas;
        var customTranslateModule = {
            translate: [ 'value', customTranslate ]
        };
        this.bpmnModeler = new BpmnModeler({
          container: canvas,
          //添加属性面板，添加翻译模块
          additionalModules: [
              customTranslateModule,
              // 自定义部分
              customControlsModule
          ],
          //模块拓展，拓展activiti的描述
          moddleExtensions: {
              activiti: activitiModdleDescriptor
          }
        });
        // 默认进来初始化xml
        this.importBpmnXml()

      },
      //导入xml文档
      async importBpmnXml(xml = ''){
        const that = this;
        // let bpmnXml = bpmnHelper.getBpmnTempate();
        // if(xml || that.params.bpmnXml) {
        //   bpmnXml =
        // }
        try {
          const aa = await that.bpmnModeler.importXML(xml || that.params.bpmnXml);
          console.log(aa)
          that.success();
        }catch (e) {
          console.error('bpmn文档导入失败', e);
        }
        // await that.bpmnModeler.importXML(bpmnXml,function(err){
        //     if(err){
        //
        //     } else {
        //       // 绑定监听事件
        //       that.success()
        //     }
        // });
      },
      getBpmnModeler() {
        return this.bpmnModeler
      },
      // 创建完bpmnModeler 实例后绑定事件
      success() {

        // 初始化element
        const elementRegistry = this.bpmnModeler.get('elementRegistry')
        const shape = elementRegistry.get(this.bpmnModeler.get('canvas').getRootElement().id);
        this.element = shape;
        console.log('创建成功!', this.element);
        // 新增了 对shape的 增加，移动，删除监听事件
        // this.addModelerListener()
        // 对元素 点击，修改 的监听事件
        this.addEventBusListener()
        // 调控左侧工具栏
        this.adjustPalette();
      },
      addModelerListener() {
        // 监听 modeler
        const bpmnjs = this.bpmnModeler
        const that = this
        // 'shape.removed', 'connect.end', 'connect.move'
        const events = ['shape.added', 'shape.move.end', 'shape.removed']
        events.forEach(function(event) {
          that.bpmnModeler.on(event, e => {
            var elementRegistry = bpmnjs.get('elementRegistry')
            var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
            if (event === 'shape.added') {
              console.log('新增了shape', event, shape);
              // 展示新增图形的属性
              that.key = e.element.id.replace('_label', '');
              that.propsComponent = bpmnHelper.getComponentByEleType(shape.type);
              that.element = e.element;

            } else if (event === 'shape.move.end') {
              console.log('移动了shape', event, shape)
              // 展示新增图形的属性
              that.key = shape.id;
              that.propsComponent = bpmnHelper.getComponentByEleType(shape.type);
              that.element = e.shape;
            } else if (event === 'shape.removed') {
              console.log('删除了shape',event, shape)
              // 展示默认的属性
              that.propsComponent = 'CommonProps'
            }
          })
        })
      },
      addEventBusListener() {
        // 监听 element
        let that = this
        const eventBus = this.bpmnModeler.get('eventBus')
        const eventTypes = ['element.click', 'element.changed', 'selection.changed']
        eventTypes.forEach(function(eventType) {
          eventBus.on(eventType, async function(e) {
            if (eventType === 'element.changed') {
              await that.elementChanged(e)
            } else if (eventType === 'element.click') {
              if (!e || e.element.type === 'bpmn:Process') {
                that.key =  e.element.id;
                that.propsComponent =  'CommonProps'
                that.element =  e.element;
              } else {
                // 展示新增图形的属性
                that.key = await  e.element.id;
                that.propsComponent = await  bpmnHelper.getComponentByEleType(e.element.type);
                that.element = await  e.element;
              }
              console.log('点击了element', e, that.propsComponent);
            }
          })
        })
      },
      isInvalid (param) { // 判断是否是无效的值
        return param === null || param === undefined || param === ''
      },
      isSequenceFlow (type) { // 判断是否是线
        return type === 'bpmn:SequenceFlow'
      },
      elementChanged(e) {
        const id = e.element.id.replace('_label', '');
        var shape = this.getShape(id);
        this.element = shape;
        const that = this;
        console.log(shape);
        if (!shape) {
          // 若是shape为null则表示删除, 无论是shape还是connect删除都调用此处
          console.log('无效的shape')
          // 上面已经用 shape.removed 检测了shape的删除, 要是删除shape的话这里还会被再触发一次
          console.log('删除了shape和connect')
          return
        }
        if (!this.isInvalid(shape.type)) {
          if (this.isSequenceFlow(shape.type)) {
            console.log('改变了线')
          } else {
            that.setDefaultProperties();
          }
        }
      },
      getShape(id) {
        var elementRegistry = this.bpmnModeler.get('elementRegistry')
        return elementRegistry.get(id)
      },
      setDefaultProperties() {
        console.log('setDefaultProperties');
        const that = this;
        const { element } = that;
        if (element) {
          // 这里可以拿到当前点击的节点的所有属性
          const { type, businessObject } = element;
          const { name } = businessObject;
          if (that.verifyIsEvent(type)) {
            const eventType = businessObject.eventDefinitions ? businessObject.eventDefinitions[0]['$type'] : '';
            console.log(eventType);
          } else if (this.verifyIsTask(type)) {
            const taskType = type;
            console.log(taskType);
          }
          that.element['name'] = name || that.defaultData[element.type]
          }
      },
      verifyIsEvent(type) {
        return type.includes('Event')
      },
      verifyIsTask(type) {
        return type.includes('Task')
      },

      // 调整左侧工具栏排版
      adjustPalette() {
        try {
          // 获取 bpmn 设计器实例
          const canvas = this.$refs.canvas;
          const djsPalette = canvas.children[0].children[1].children[4];
          const djsPalStyle = {
            width: "130px",
            padding: "5px",
            background: "white",
            left: "20px",
            borderRadius: 0
          };
          for (var key in djsPalStyle) {
            djsPalette.style[key] = djsPalStyle[key];
          }
          const palette = djsPalette.children[0];
          const allGroups = palette.children;
          // allGroups[0].style["display"] = "none";
          allGroups[4].style["display"] = "none";
          allGroups[5].style["display"] = "none";
          allGroups[6].style["display"] = "none";
          allGroups[7].style["display"] = "none";
          // 修改控件样式
          for (var gKey in allGroups) {
            let group = allGroups[gKey];
            for (var cKey in group.children) {
              const control = group.children[cKey];
              const controlStyle = {
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "100%",
                padding: "5px"
              };
              if (
                control.className &&
                control.dataset &&
                control.className.indexOf("entry") !== -1
              ) {
                const controlProps = this.bpmData.getControl(
                  control.dataset.action
                );
                control.innerHTML = `<div style='font-size: 14px;font-weight:500;margin-left:15px;'>${
                  controlProps["title"]
                }</div>`;
                for (var csKey in controlStyle) {
                  control.style[csKey] = controlStyle[csKey];
                }
              }
            }
          }
        } catch (e) {
          console.log(e);
        }
      },
  },
  mounted () {
    //初始化模型编辑器
    this.initBpmnModeler();
  }
}

</script>

<style>
.el-form-item__label {
  font-size: 13px
}
.el-main {
  padding: 5px
}
.el-input--mini .el-input__inner {
    height: 23px;
    line-height: 23px;
}
.el-form--label-top .el-form-item__label {
    padding: 0 0 0px;
}
.el-form-item--mini .el-form-item__content, .el-form-item--mini .el-form-item__label {
    line-height: 23px;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 3px;
}
.el-checkbox__label {
    padding-left: 10px;
    line-height: 19px;
    font-size: 13px;
}
.el-input__inner{
      padding: 0 5px;
}
.el-textarea__inner {
  padding: 5px 5px;
}
.el-input--mini .el-input__icon {
    line-height: 23px;
}
.saveXml {
  display: flex;
  margin-left: 350px;
}
</style>
