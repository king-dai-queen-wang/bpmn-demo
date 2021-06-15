<template>
  <div id="app">
    <vue-bpmn  @save="btnSave" :modelData="modelData"/>
  </div>
</template>

<script>
import VueBpmn from "@/components/zjmzxfzhl-bpmn/VueBpmn"

export default {
  name: 'zjmzxfzhlBpmn',
  components: {VueBpmn},
  data() {
    return {
      id: undefined,
      modelData: {
        id: undefined,
        editor: undefined,
        key: 'processId_1',
        name: 'processName_1',
        category: '',
        description: 'description_1'
      },
    }
  },

  methods: {
    btnSave(modelData) {
      var xmlBlob = new Blob([modelData.editor], {
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
    }
  }
}
</script>
