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
    // drawColor() {
    //   var overlays = this.bpmnViewer.get('overlays'),
    //       elementRegistry = this.bpmnViewer.get('elementRegistry');
    //
    //   var shape = elementRegistry.get('usertask1');
    //
    //   var $overlayHtml = $('<div class="highlight-overlay">')
    //       .css({
    //         width: shape.width,
    //         height: shape.height
    //       });
    //
    //   overlays.add('usertask2', {
    //     position: {
    //       top: 0,
    //       left: 0
    //     },
    //     html: $overlayHtml
    //   });
    // },
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
    success () {
      this.addModelerListener()
      this.addEventBusListener()
    },
    // 添加绑定事件
    addBpmnListener () {
      const that = this
      // 获取a标签dom节点
      const downloadLink = this.$refs.saveDiagram
      const downloadSvgLink = this.$refs.saveSvg
      // 给图绑定事件，当图有发生改变就会触发这个事件
      this.bpmnViewer.on('commandStack.changed', function () {
        that.saveSVG(function(err, svg) {
          that.setEncoded(downloadSvgLink, 'diagram.svg', err ? null : svg)
        })
        that.saveDiagram(function(err, xml) {
          that.setEncoded(downloadLink, 'diagram.bpmn', err ? null : xml)
        })
      })
    },
    addModelerListener() {
      // 监听 modeler
      const bpmnjs = this.bpmnViewer
      const that = this
      // 'shape.removed', 'connect.end', 'connect.move'
      const events = ['shape.added', 'shape.move.end', 'shape.removed']
      events.forEach(function(event) {
        that.bpmnViewer.on(event, e => {
          var elementRegistry = bpmnjs.get('elementRegistry')
          var shape = e.element ? elementRegistry.get(e.element.id) : e.shape
          // console.log(shape)
          if (event === 'shape.added') {
            console.log('新增了shape', e);
          } else if (event === 'shape.move.end') {
            console.log('移动了shape', e);
          } else if (event === 'shape.removed') {
            console.log('删除了shape', e);
          }
        })
      })
    },
    addEventBusListener() {
      // 监听 element
      let that = this
      const eventBus = this.bpmnViewer.get('eventBus')
      const eventTypes = ['element.click', 'element.changed']
      eventTypes.forEach(function(eventType) {
        eventBus.on(eventType, function(e) {
          if (!e || e.element.type == 'bpmn:Process') return
          if (eventType === 'element.changed') {
            that.elementChanged(eventType, e)
          } else if (eventType === 'element.click') {
            console.log('点击了element', e)
          }
        })
      })
    },
    elementChanged(eventType, e) {
      var shape = this.getShape(e.element.id)
      if (!shape) {
        // 若是shape为null则表示删除, 无论是shape还是connect删除都调用此处
        console.log('无效的shape')
        // 由于上面已经用 shape.removed 检测了shape的删除, 因此这里只判断是否是线
        if (this.isSequenceFlow(shape.type)) {
          console.log('删除了线')
        }
      }
      if (!this.isInvalid(shape.type)) {
        if (this.isSequenceFlow(shape.type)) {
          console.log('改变了线')
        }
      }
    },
    getShape(id) {
      var elementRegistry = this.bpmnViewer.get('elementRegistry')
      return elementRegistry.get(id)
    },
    isInvalid (param) { // 判断是否是无效的值
      return param === null || param === undefined || param === ''
    },
    isSequenceFlow (type) { // 判断是否是线
      return type === 'bpmn:SequenceFlow'
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