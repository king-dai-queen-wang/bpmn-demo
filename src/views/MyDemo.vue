<template>
  <div class="containers">
    <ToolboxHeader class="toolbox" :bpmnModeler="bpmnModeler" @loadXml="createNewDiagram"></ToolboxHeader>
    <el-container>
      <el-main>
        <div class="canvas" ref="canvas"></div>
      </el-main>
      <el-aside width="30%" style="min-width:350px">
        <ProcessPanel
            v-if="bpmnModeler"
            id="designRight"
            ref="designRight"
            :process-info.sync="processInfo"
            :bpmn-modeler.sync="bpmnModeler"
            class="designRight"
        />
      </el-aside>
    </el-container>

  </div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler';
import ToolboxHeader from "@/components/my-demo/toolbox-header/ToolboxHeader"; // 这里是直接引用了xml字符串
import defaultXml from '@/components/my-demo/routinecheck.bpmn';
import ProcessPanel from '@/components/my-demo/properties-panel/ProcessPanel'
import moddleDescriptor from "../components/my-demo/description/activiti.json";
import CommonProps from "@/components/my-demo/properties-panel/props/CommonProps";
import customTranslate from '../components/my-demo/i18n/customTranslate';

export default {
  name: "MyDemo",
  components: {CommonProps, ToolboxHeader, ProcessPanel},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() { },
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted() {
    this.init()
  },
  data() {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
      defaultXML: defaultXml,
      processInfo: {
        processKey: '123',
        processName: 'dww',
        processXml: '',
        remarks: 'dww remarks'
      },
    }
  },
  methods: {
    init() {
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas;
      this.canvas = canvas;
      const customTranslateModule = {
        translate: [ 'value', customTranslate ]
      };
      // 建模
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        additionalModules: [
          //   i18n
          customTranslateModule
          // 左边工具栏以及节点
          // propertiesProviderModule,
        ],
        keyboard: {
          bindTo: document.body
        },
        moddleExtensions: {
          activiti: moddleDescriptor
        },
      })
      this.createNewDiagram({xmlStr: this.defaultXML})
    },
    async createNewDiagram({xmlStr}) {
      // 将字符串转换成图显示出来
      await this.bpmnModeler.importXML(xmlStr);
      await this.success();
      var canvas = this.bpmnModeler.get('canvas');
      canvas.zoom('fit-viewport');
      this.processInfo.processXml = xmlStr;
    },
    success() {
      // console.log('创建成功!')
    }
  }
}
</script>

<style scoped>
.containers{
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  height: 100vh;
}
.toolbox{
  height: 20px;
}
.canvas{
  flex: 1;
}
.panel{
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
}
</style>