<template>
  <div class="home">
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
    https://miyuesc.github.io/process-designer/
  </div>
</template>

<script>

export default {
  name: "home",
  components: {
  },
  data () {
    return {
      links: [
        { to: '/camunda', title: 'camunda' },
        { to: '/dww-example', title: '我的例子' },
        { to: '/yiyang-activiti', title: 'yiyang的activiti例子' },
        {to: '/zjmzxfzhl-bpmn', title: 'zjmzxfzhlBpmn flowable 例子'},
        { to: '/bpmn-web-ui', title: 'bpmn-web-ui'},
        { to: '/my-demo', title: 'my-demo'}
      ]
    }
  }
};
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