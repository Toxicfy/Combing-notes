<!-- 定义组件 component -->

<template>
  <div class="listbox">
    <h1>{{ title }}</h1>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <slot :item="item"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    title: String,
    list: Array
  }
};
</script>



<template>
  <div id="app">
    <div class="tirp-wrapper">
      <!-- use component -->
      <list :title="列表" :list="list">
        <!-- 实际上这里是父组件访问到子组件的数据 -->
        <span slot-scope="props">{{ props.item.name }}</span>
      </list>
    </div>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    title: String,
    list: Array
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
