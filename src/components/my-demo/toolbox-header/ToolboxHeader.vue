<template>
  <ul>
    <li>
      <a href="javascript:" @click="$refs.refFile.click()">加载本地BPMN文件</a>
      <input type="file" id="files" ref="refFile" style="display: none" @change="loadXML" />
    </li>
    <li>
      <a href="javascript:" @click="saveXML" title="保存为bpmn">保存为BPMN文件</a>
    </li>
    <li>
      <a href="javascript:" @click="watchXML" title="保存为bpmn">查看xml内容</a>
    </li>
    <li>
      <a href="javascript:" @click="clear" title="清空画布">清空画布</a>
    </li>
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
      <a href="javascript:" @click="saveSVG" title="保存为svg">保存为SVG图片</a>
    </li>

    <el-select v-model="lang" placeholder="请选择" @change="changeLang($event)">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
  </ul>

</template>

<script>
export default {
  name: "ToolboxHeader",
  props: {
    bpmnModeler: {
      type: Object,
      default: null
    }
  },
  components: {

  },
// 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
// 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted() {

  },
  data() {
    return {
      lang: localStorage.getItem('lang') || 'en',
      options: [{
        value: 'zh',
        label: '中文'
      }, {
        value: 'en',
        label: 'English'
      }]
    }
  },
  methods: {
    replaceLtAndGt(xml){
      xml = xml.replace(/&lt;/g, '<')
      xml = xml.replace(/&gt;/g, '>')
      xml = xml.replace(/&amp;/g, '&')
      return xml
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

    async watchXML() {
      const result = await this.bpmnModeler.saveXML({format:true});
      const { xml } = result;
      const xmlRes = this.replaceLtAndGt(xml);
      console.log(xmlRes);
    },

    async saveXML() {
      try {
        const result = await this.bpmnModeler.saveXML({ format: true });
        const { xml } = result;
        const xmlRes = this.replaceLtAndGt(xml);
        var xmlBlob = new Blob([xmlRes], {
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
      // const that = this;
      reader.onload = function() {
        that.$emit('loadXml', {
          xmlStr: this.result,
        });
      };
    },
    async clear() {
      await this.bpmnModeler.clear();
      await this.bpmnModeler.importXML(`<?xml version="1.0" encoding="UTF-8"?>
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
                  </bpmn2:definitions>`)
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
    changeLang(value) {
      localStorage.setItem('lang', value);
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
  ul{
    display: flex;
    align-items: center;
    li{
      display: block;
      margin: 0 4px;
    }
  }
</style>