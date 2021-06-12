<template>
  <div>
    <ul class="router_ul">
      <router-link
          v-for="link in links"
          :key="link.to" tag="li"
          active-class="activeClass"
          :to="link.to">
        {{ link.title }}
      </router-link>
    </ul>

    <router-view></router-view>
  </div>


</template>

<script>



export default {
  name: "MyExample",
  data () {
    return {
      links: [
        { to: '/dww-example/base-viewer', title: '预览模式' },
        { to: '/dww-example/base-editor', title: '基本使用' },
        { to: '/dww-example/customer-palette', title: '自定义左侧工具栏' },
        { to: '/dww-example/customer-context-pad', title: '自定义context-pad' },
        { to: '/dww-example/axios', title: '通过网络请求获取bpmn并渲染' },
        { to: '/dww-example/save', title: '保存bpmn并发送给后台' },
        { to: '/dww-example/event', title: '绑定event事件' }
      ]
    }
  }
}
</script>

<style scoped>
.router_ul {
  display: flex;
  justify-content: center;
  margin: 0;
  list-style: none;
  padding: 10px 0;
}
.router_ul li {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all 0.3s;
}
.router_ul li.activeClass {
  background: #4d90fe;
  color: #fff;
  border: none;
}
</style>