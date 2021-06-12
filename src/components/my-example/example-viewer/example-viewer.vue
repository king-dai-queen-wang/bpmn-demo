<template>
  <div class="dww-example">
    Viewer
    <div class="containers">
      <div class="canvas" ref="canvas"></div>
    </div>

  </div>

</template>

<script>
import BpmnViewer from "bpmn-js/lib/Modeler";
import {defaultXML} from './defatltXML.js';
export default {
  name: "baseViewer",
  data() {
    return {
      defaultXML: ``,
      bpmnViewer: null,
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
      this.bpmnViewer = new BpmnViewer({
        container: canvas,
        // 快捷键
        keyboard: {
          bindTo: window
        }
      });
      this.createNewDiagram(this.defaultXML);
    },
    drawColor() {
      var overlays = this.bpmnViewer.get('overlays'),
          elementRegistry = this.bpmnViewer.get('elementRegistry');

      var shape = elementRegistry.get('usertask1');

      var $overlayHtml = $('<div class="highlight-overlay">')
          .css({
            width: shape.width,
            height: shape.height
          });

      overlays.add('usertask2', {
        position: {
          top: 0,
          left: 0
        },
        html: $overlayHtml
      });
    },
    // 导入xml
    async createNewDiagram(bpmn) {
      try {
        const result = await this.bpmnViewer.importXML(bpmn);
        // const { warnings } = result;
        // console.log(warnings);
        this.success();
      } catch (err) {
        console.log(err.message, err.warnings);
      }
    },
    success() {
      this.addEventBusListener();
    },
    addEventBusListener() {
      const that = this;
      const eventBus = this.bpmnViewer.get("eventBus");

      eventBus.on("element.click", function(e) {
        console.log("eventBusListener", e);
      });

      const canvas = this.bpmnViewer.get("canvas");
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

</style>