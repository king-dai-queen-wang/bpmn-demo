<template>
  <div class="dww-example">
    基本使用 (CAMUADA)
    <div id="canvas" class="containers" style="height:80vh;">
      <div id="js-properties-panel" class="properties-panel"></div>
    </div>

    <div class="toolbox">
      <li>
        <a href="javascript:" class="active" @click="handlerUndo" title="撤销操作">撤销</a>
      </li>
      <li>
        <a href="javascript:" class="active" @click="handlerRedo" title="恢复操作">恢复</a>
      </li>
      <li>
        <a href="javascript:" class="active" @click="handlerZoom(0.1)" title="放大">放大</a>
      </li>
      <li>
        <a href="javascript:" class="active" @click="handlerZoom(-0.1)" title="缩小">缩小</a>
      </li>
      <li>
        <a href="javascript:" class="active" @click="handlerZoom(0)" title="还原">还原</a>
      </li>
      <li>
        <a href="javascript:" @click="$refs.refFile.click()">加载本地BPMN文件</a>
        <input type="file" id="files" ref="refFile" style="display: none" @change="loadXML" />

      </li>

      <li>
        <a href="javascript:" @click="saveXML" title="保存为bpmn">保存为BPMN文件</a>
      </li>
      <li>
        <a href="javascript:" @click="saveSVG" title="保存为svg">保存为SVG图片</a>
      </li>
      <li>
        <a href="javascript:" @click="watchXML" title="查看xml">查看xml</a>
      </li>
    </div>

  </div>

</template>

<script>
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css' // 右边工具栏样式
import BpmnModeler from "bpmn-js/lib/Modeler";
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import propertiesPanelModule from 'bpmn-js-properties-panel';
// 一个描述的json
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
import bpmnHelper from "../../yiyang-activiti/edit-modeler/js/helper/BpmnHelper";

export default {
  name: "baseEditor",
  data() {
    return {
      bpmnModeler: null,
      defaultXML: `<?xml version="1.0" encoding="UTF-8"?>
                  <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
                  <bpmn2:process id="Process_1" isExecutable="false">
                    <bpmn2:startEvent id="StartEvent_1" />
                  </bpmn2:process>
                  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
                    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
                      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
                        <dc:Bounds x="192" y="82" width="36" height="36" />
                      </bpmndi:BPMNShape>
                    </bpmndi:BPMNPlane>
                  </bpmndi:BPMNDiagram>
                  </bpmn2:definitions>`,
      scale: 1,
    }
  },
  mounted() {
    this.initCanvas();

  },
  methods: {
    initCanvas() {
      this.bpmnModeler = new BpmnModeler({
        container: '#canvas',
        //添加控制板
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        additionalModules: [
          // 左边工具栏以及节点
          propertiesProviderModule,
          // 右边的工具栏
          propertiesPanelModule
        ],
        moddleExtensions: {
          //如果要在属性面板中维护camunda：XXX属性，则需要此
          camunda: camundaModdleDescriptor
        },
        // 快捷键
        keyboard: {
          bindTo: window
        }
      });
      this.createNewDiagram(this.defaultXML);
    },
    // 恢复
    handlerRedo() {
      this.bpmnModeler.get("commandStack").redo();
    },
    // 撤回
    handlerUndo() {
      this.bpmnModeler.get("commandStack").undo();
    },
    // zoom 缩放
    handlerZoom(radio) {
      const newScale = !radio ? 1.0 : this.scale + radio;
      this.bpmnModeler.get("canvas").zoom(newScale);

      this.scale = newScale;
    },

    async saveSVG() {
      try {
        const result = await this.bpmnModeler.saveSVG();
        const { svg } = result;

        var svgBlob = new Blob([svg], {
          type: "image/svg+xml"
        });

        var downloadLink = document.createElement("a");
        downloadLink.download = "ops-coffee-bpmn.svg";
        downloadLink.innerHTML = "Get BPMN SVG";
        downloadLink.href = window.URL.createObjectURL(svgBlob);
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

    loadXML() {
      const that = this;
      const file = this.$refs.refFile.files[0];

      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function() {
        that.xmlStr = this.result;
        that.createNewDiagram(that.xmlStr);
      };
    },

    // 导入xml
    async createNewDiagram(bpmn) {
      try {
        const result = await this.bpmnModeler.importXML(bpmn);
        // const { warnings } = result;
        // console.log(warnings);
        this.success();
      } catch (err) {
        console.log(err.message, err.warnings);
      }
    },
    success() {
      this.addModelerListener();
      this.addEventBusListener();
    },
    // addEventBusListener() {
    //   const that = this;
    //   const eventBus = this.bpmnModeler.get("eventBus");
    //
    //   eventBus.on("element.click", function(e) {
    //     console.log("eventBusListener", e);
    //   });
    // },
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
          } else if (event === 'shape.move.end') {
            console.log('移动了shape', event, shape)
          } else if (event === 'shape.removed') {
            console.log('删除了shape',event, shape)
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
            // await that.elementChanged(e)
            console.log('element change', e)
          } else if (eventType === 'element.click') {
            if (!e || e.element.type == 'bpmn:Process') {
              console.log(eventType, e,)
            } else {
              // 展示新增图形的属性
              console.log(eventType, e,)
            }
            console.log('点击了element', e, that.propsComponent);
          }
        })
      })
    },
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
  },

}
</script>

<style scoped>
  .toolbox{
    display: flex;
  }
  .toolbox li{
    /*width: 150px;*/
  }

  .containers {
    position: relative;
    background: white;
    overflow: auto;
    background-image: linear-gradient(
        90deg,
        rgba(220, 220, 220, 0.5) 6%,
        transparent 0
    ),
    linear-gradient(rgba(192, 192, 192, 0.5) 6%, transparent 0);
    background-size: 12px 12px;
    width: 100%;
    height: calc(100vh - 82px);
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
  .properties-panel{
    overflow: auto;
    width: 30%;
    height: 100%;
    position: absolute;
    right: 0;
    z-index: 1;
  }
</style>