<template>
  <div class="dww-example">
    <div id="canvas" class="containers" style="height:80vh;">
      <div id="js-properties-panel" class="property-panel"></div>
    </div>

    <div class="toolbox">
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
// 原有的 properties-panel 这个框
import propertiesPanelModule from 'bpmn-js-properties-panel'
// 自定义的 properties-panel内容
import propertiesProviderModule from './properties-panel-extension/provider/authority';
// 引入描述文件
import authorityModdleDescriptor from './properties-panel-extension/descriptors/authority'
// 一个描述的json
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
export default {
  name: "CustomerPropertyPanel",
  data() {
    return {
      bpmnModeler: null,
      defaultXML: `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bpmn.io/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="5.1.2">
<process id="Process_1" isExecutable="false">
    <startEvent id="StartEvent_1y45yut" name="开始">
    <outgoing>SequenceFlow_0h21x7r</outgoing>
    </startEvent>
    <task id="Task_1hcentk">
    <incoming>SequenceFlow_0h21x7r</incoming>
    </task>
    <sequenceFlow id="SequenceFlow_0h21x7r" sourceRef="StartEvent_1y45yut" targetRef="Task_1hcentk" />
</process>
<bpmndi:BPMNDiagram id="BpmnDiagram_1">
    <bpmndi:BPMNPlane id="BpmnPlane_1" bpmnElement="Process_1">
    <bpmndi:BPMNShape id="StartEvent_1y45yut_di" bpmnElement="StartEvent_1y45yut">
        <omgdc:Bounds x="152" y="102" width="36" height="36" />
        <bpmndi:BPMNLabel>
        <omgdc:Bounds x="160" y="145" width="22" height="14" />
        </bpmndi:BPMNLabel>
    </bpmndi:BPMNShape>
    <bpmndi:BPMNShape id="Task_1hcentk_di" bpmnElement="Task_1hcentk">
        <omgdc:Bounds x="240" y="80" width="100" height="80" />
    </bpmndi:BPMNShape>
    <bpmndi:BPMNEdge id="SequenceFlow_0h21x7r_di" bpmnElement="SequenceFlow_0h21x7r">
        <omgdi:waypoint x="188" y="120" />
        <omgdi:waypoint x="240" y="120" />
    </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</definitions>`,
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
          // 右边的工具栏(固定引入)
          propertiesPanelModule,
          // 自定义右边工作栏的内容
          propertiesProviderModule
        ],
        moddleExtensions: {
          //如果要在属性面板中维护camunda：XXX属性，则需要此
          // camunda: camundaModdleDescriptor,
          authority: authorityModdleDescriptor
        },
        // 快捷键
        keyboard: {
          bindTo: window
        }
      });
      this.createNewDiagram(this.defaultXML);
    },
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
    async watchXML() {
      try {
        const result = await this.bpmnModeler.saveXML({ format: true });
        const { xml } = result;
        console.log(xml);
      } catch (e) {
        console.error('生成失败', e)
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
  }
}
</script>

<style scoped>
  .containers{
    position: relative;
  }
  .property-panel{
    position: absolute;
    right: 0;
    width: 300px;
    height: 100%;
    overflow: auto;
    z-index: 1;
  }
</style>