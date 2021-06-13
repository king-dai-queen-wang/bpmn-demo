<template>
  <div class="dww-example">
    自定义 palette
    <div class="containers">
      <div class="canvas" ref="canvas"></div>
      <li>
        <a href="javascript:" @click="saveXML" title="保存为bpmn">保存为BPMN文件</a>
      </li>
    </div>

  </div>

</template>

<script>
import {CustomModeler} from "./index";
import {defaultXML} from './defatltXML.js';
export default {
  name: "customerPalette",
  data() {
    return {
      defaultXML: ``,
      bpmnModeler: null,
      container: null,
      canvas: null,
      scale: 1,
    }
  },
  mounted() {
    this.defaultXML = defaultXML;
    this.initCanvas();
    // this.drawColor();
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      this.bpmnModeler = new CustomModeler({
        container: canvas,
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
        this.success();
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
    success() {
      this.addEventBusListener();
    },
    addEventBusListener() {
      const that = this;
      const eventBus = this.bpmnModeler.get("eventBus");
      const modeling = this.bpmnModeler.get('modeling')
      const elementRegistry = this.bpmnModeler.get('elementRegistry');

      eventBus.on("element.click", function(e) {
        console.log("eventBusListener", e);
        var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
        if (shape.type === 'bpmn:Task') {
          modeling.updateProperties(shape, {
            name: '我是修改后的节点,并且同步到xml里',
            isInterrupting: false,
            customText: '我是自定义的text属性'
          })
        }
      });

      const canvas = this.bpmnModeler.get("canvas");
      canvas.zoom("fit-viewport", "auto");
    }
  },

}
</script>

<style scoped>
.containers {
  width: 100%;
  height: calc(100vh - 82px);
}
.canvas {
  width: 100%;
  height: 100%;
}

.highlight-overlay {
  background-color: green;
  opacity: 0.4;
  pointer-events: none;
}

.djs-palette .djs-palette-entries .bpmn-icon-data-store {
  display: none;
}
</style>