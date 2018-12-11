// get state into vue Components（组件从store中获取数据）

// example:
// const Counter = {
//     template: `<div>{{count}}</div>`,
//     // we can use computed monitor state, and trigger associated Dom update
//     computed: {
//         counter() {
//             return store.state.count
//         }
//     }
// };

// create store (store.js)
import Vue from "vue";
import Vuex from "vuex";
const store = new Vuex.store({
  state: { count: 0 }
});
export default store;

// register store (index.js)
import store from "./store";
import Counter from "./components/Counter";
const app = new Vue({
  el: "#app",
  components: { Counter },
  store,
  template: `<div id="app"><counter></counter></div>`
});

// providing the store option to root instance,we could get store as this.$store
// 在根组件进行了注册后，在组件中就可以直接使用Vue实例属性进行访问： this.$store.valueName
import { mapState } from "vuex";

const Counter = {
  template: `<div>{{count}}</div>`,
  computed: {
    counter() {
      return this.$store.count;
    }
  },
  // 辅助函数：if  we make use of multiple store state, we could use mapState helper as computed getter
  computed: mapState({
    count: state => state.count, // direct getter
    combinationState(state) {
      //need combine localState
      return this.count + this.localCount;
    }
  }),
  //
  computed: {
    localComputerState() {
      return this.localComputerStateNum++;
    },
    ...mapState({}), // mix this into outer Object(computed)

    // computed propName same as one of store state;
    ...mapState([
      "count" // map this.count to store.state.count
    ])
  }
};
