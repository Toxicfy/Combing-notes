# vuex

## 简述

在 `SPA` 单页面组件的开发中 `vuex` 扮演的角色是管理全局状态

> 全局状态怎么理解？？
> `store` 中定义了一个数据之后，你可以在所在项目中的任何一个组件里进行获取、进行修改，并且当 `store` 中的状态发生变化可以得到 **全局的响应变更**（这体现在使用该数据的相应组件也会得到高效更新）

> 全局状态 vs 组件通信
> 首先避免了跨组件传值的麻烦，作为工程项目**显式**的改变状态（因为提交 `mutation` 是更改状态的唯一方法且需要定义；

相对于 `bus`，当项目变大，不同的组件应用同一个状态的时候，任何时间都可以改变数据，却没有变更过的记录，调试将会变为噩梦。所以 `vuex` 实现对于 `store` 的封装有利于跟踪数据的变化，进行调试定位 `bug` ；

> vuex<span data-type="color" style="color:rgb(119, 119, 119)"><span data-type="background" style="background-color:rgb(255, 255, 255)">是如何实现类 Flux 架构的数据管理的？？</span></span>

![image.png | center | 459x361](https://cdn.nlark.com/yuque/0/2018/png/203019/1545707893800-58959b8e-b404-41db-a389-7978ea5cfed0.png)

<span data-type="color" style="color:#000000">构建</span><span data-type="color" style="color:#000000"><strong> Store 实例 </strong></span><span data-type="color" style="color:#000000">并在根组件注入后，通过 Vue 实例属性</span><span data-type="color" style="color:#000000"><em> store.state </em></span><span data-type="color" style="color:#000000">获得 Vuex 状态，对于直接操作 state 派生出一些常用的状态，我们使用 Getter 处理完成后存在 Store 中进行调用；从而完成对数据的获取；修改的需要提交 mutation，告诉需要变更数据；由于回调函数中进行的状态的改变都是不可追踪 Action 包含任意异步操作（本质依旧是提交的是 mutation，而不是直接变更状态），同时也是异步获取后端服务的触发位置；</span>

```javascript

//install
npm install vuex --save

//store.js(about Store)
export default new Vuex.Store({
  state,      //要设置的全局访问的state对象
  getters,    //基于state数据的二次包装，常用于数据的筛选和多个数据的相关性计算
  actions,    //异步提交 mutations
  mutations   //修改state的唯一方式
})
```

接下来：我们先逐个讲述这几个 Store 的实例属性：

## state && getter

```javascript
// create store (store.js)
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.store({
  state: { count: 0 }
});

export default store;

// register store (index.js)
import "babel-polyfill";
import Vue from "vue";
import App from "app.vue";
import store from "./store";

new Vue({
  el: "#app",
  store, //注入store
  render: h => h(App)
});
```

完成注入后：

```javascript
// 在根组件进行了注册后，在组件中就可以直接使用Vue实例属性进行访问： this.$store.valueName
import { mapState } from "vuex";

const Counter = {
  template: `<div>{{count}}</div>`,
  computed: {
    counter() {
      return this.$store.count;
    }
  },
  // 辅助函数
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
```

```javascript
// Vuex allows us to define "getters" in the store. You can think of them as computed properties for stores.
const store = new Vuex.store({
  state: {
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false }
    ]
  },
  getters: {
    // 方便的从state中获取值进行组合（keywords： 有返回值，方便获取state，多次使用）：
    doneTodos: state => {
      return state.todos.filter(todo => todo.done);
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length;
    },
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id);
    }
  }
});

//store.getter.doneTodos      --> [{id:1,text:'...',done:true}]
//store.getter.doneTodosCount --> 1
//store.getter.getTodoById(2) --> [{id:2,text:'...',done:false]

import { mapGetters } from "vuex";

// NOTICE:  getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的, 通过方法访问时，每次都会去进行调用，而不会缓存结果。
const app = new Vue({
  el: "#app",
  // computed: {
  //     doneTodosCount () {
  //         return this.$store.getters.doneTodosCount
  //     }
  // },
  computed: {
    ...mapGetters({
      //map `this.doneCount` to `this.$store.getters.doneTodosCount`
      getDoneCounts: "doneTodosCount"
    }),
    ...mapGetters([
      // direct used
      "doneTodosCount",
      "getTodoById"
    ])
  }
});
```

> 通过 `state/getter` 我们可以直接获取到 `store` 中的数据，并且可以利用 `state` 中的数据派生状态（`computed state`）（到此我们依旧无法改变 `state`）

## Mutations && Actions

更改 `Vuex` 的 `store` 中的状态的唯一方法是提交 mutation。`mutation` 不能直接调用，而要通过相应的 `type` 调用相应的`store.commit` 方法

```javascript
// 需要传入的是触发的事件类型，以及用于组合新数据的负荷
//similar as event(eventType,callback(state,payload));

//定义类型：mutation-types.js
export const INCREMENT = "INCREMENT";
export const ADD = "ADD";

//数据仓库：store.js
import Vuex from "vuex";
import { INCREMENT, ADD } from "./mutation-types";

const store = new Vuex.store({
  store: { count: 0 },
  mutations: {
    [INCREMENT]: state => state.count++, // state change
    [ADD](state, payload) {
      return state.count + payload.amount;
    }
  }
});

// but we can't directly call a mutation callback(handler); need commit this mutation;
store.commit("increment");
// store.commit('add', {amount: 10});
store.commit({ type: "add", amount: 10 }); // type property is identified as mutations type;

//同样的使用mapXXX进行简化
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations([
      "increment" // map this.increment to this.$store.commit('increment')
    ])
  }
};

// NOTICE__1: 如果在实例创建之后添加新的属性到实例上，它不会触发视图更新, 对于mutations也是如此,所以最好建议初始化就完成所有属性的添加
Vue.set(obj, "newName", 123); //add
state.obj = { ...state.obj, newName: 123 }; // replace obj

// NOTICE__2:：why all mutation must be synchronous？
// 因为回调函数中有异步函数，触发mutation后调用回调函数改变state的时机不能追踪；
```

对于 `Action` 在其中完成异步操作：因为接受一个与 `store` 实例具有相同方法和属性的 `context` 对象，可以使用 `context.commit` 提交 `mutations`；实际完成 `state` 变更依旧是 `mutation` 完成

```javascript
import Vuex from "vuex";
import { INCREMENT } from "./mutation-type";

const store = new Vuex.store({
  state: { count: 0 },
  mutation: {
    [INCREMENT](state, payload) {
      return state.count + payload.amount;
    }
  },
  action: {
    [INCREMENT]({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(res => {
          commit(INCREMENT, res);
          resolve();
        }, 100);
      });
    }
  }
});

//component use
import { INCREMENT } from "./mutation-type";

this.$store.dispatch(INCREMENT);
//mapAction
export default {
  computed: {
    local() {
      this[INCREMENT]().then(res => {
        console.log(res);
      });
    }
  },
  methods: {
    ...mapAction([
      INCREMENT //this[INCREMENT] === this.$store.dispatch(INCREMENT)
    ])
  }
};
```
