<template>
  <div>
    <el-form
      :inline="true"
      label-width="120px"
      size="small"
    >
      <el-form-item label="编号">
        <el-input v-model="id" />
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="name"/>
      </el-form-item>
      <el-form-item label="设置跳转条件">
        <el-input
          v-model="tempCondition"
          type="textarea"
          placeholder="请填写JUEL表达式，如： ${1==1}"
          :autosize="{minRows: 4, maxRows:10}"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
let _this = null;
export default {
  components: { },
  name: 'SequenceFlowProps',
  props: ['element'],
  inject: ['bpmnModeler'],
  data() {
    return {
      modeling: null,
      id: this.element.id || '',
      name: '',
      tempCondition: '',
    }
  },
  watch: {
    name: {
      handler(value) {
        this.modeling.updateProperties(this.element, {
          'name': value
        })
      }
    },
    element: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        this.initPropertyValues(newVal);
      }
    },
    tempCondition: {
      immediate: true,
      handler(value) {
        const newCondition = this.bpmnModeler().get('moddle')
            .create('bpmn:FormalExpression', {body: `<![CDATA[${value}]]>`})
        this.bpmnModeler().get('modeling').updateProperties(this.element, {conditionExpression: newCondition})
      }
    }
  },
  created() {
    _this = this;
  },
  mounted() {
    const bpmnModeler = this.bpmnModeler()
    this.modeling = bpmnModeler.get('modeling')
  },

  methods: {
    parseCDATA(str) {
      if (str) {
        const tmp = str.replace(/<!\[CDATA\[(.+)\]\]>/, '$1')
        const value = tmp.replace(/&lt;!\[CDATA\[(.+)\]\]&gt;/, '$1')
        return value
      }
    },
    initPropertyValues(newVal) {
      this.name = newVal.businessObject.name;
      this.tempCondition = this.parseCDATA(this.element.businessObject.conditionExpression?.body)
    }
  }
}

</script>
<style>

</style>
