<template>
  <div class="dww-example">
    完全自定义右侧菜单
    <div id="canvas" class="containers" style="height:80vh;">
      <properties-view class="properties-panel" v-if="bpmnModeler" :modeler="bpmnModeler"></properties-view>
    </div>
    <div class="toolbox">
      <li>
        <a href="javascript:" @click="$refs.refFile.click()">加载本地BPMN文件</a>
        <input type="file" id="files" ref="refFile" style="display: none" @change="loadXML" />
      </li>
      <li>
        <a href="javascript:" @click="saveXML" title="保存为bpmn">保存为BPMN文件</a>
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
import PropertiesView from './properties-view';

export default {
  name: "CustomerActivitiPanelV2",
  components: {
    PropertiesView
  },
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
        // 快捷键
        keyboard: {
          bindTo: window
        }
      });
      this.createNewDiagram(this.defaultXML);
    },
    // 导入xml
    async createNewDiagram(bpmn) {
      try {
        const result = await this.bpmnModeler.importXML(bpmn);
        // const { warnings } = result;
        // console.log(warnings);
        // this.success();
      } catch (err) {
        console.log(err.message, err.warnings);
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
  }
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
  background: pink;
  right: 0;
  z-index: 1;
}
</style>