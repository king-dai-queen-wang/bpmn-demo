<template>
  <div v-if="userTask">
    <p>{{ formData.name }}</p>
  </div>

</template>

<script>
export default {
  name: "propertyPanel",
  data() {
    return {
      userTask: false,
      scriptTask: false,
      sequenceFlow: "",
      formData: {
        name: "",
        type: ""
      }
    }
  },
  computed: {
    task: {
      get: function() {
        const that = this;
        const element = this.$store.state.bpmn.nodeInfo;

        if (element.businessObject) {
          console.log(1111)
          if (element.businessObject.$type === "bpmn:UserTask") {
            that.formData.type = "用户任务";
            that.formData.name = element.businessObject.name;
            that.userTask = this.$store.state.bpmn.nodeVisible;
          }

          if (element.businessObject.$type === "bpmn:SequenceFlow") {
            that.sequenceFlow = element.businessObject.name;
            that.scriptTask = this.$store.state.bpmn.nodeVisible;
          }
        }

        return false;
      },
      set: function(val) {
        this.$store.state.bpmn.nodeVisible = val;
      }
    }
  },
  watch: {
    task(val) {}
  }
}
</script>

<style scoped>

</style>