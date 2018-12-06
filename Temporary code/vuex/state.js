// get state into vue Components
import Vue from "vue";
import Vuex from "vuex";

const store = new Vuex.store({
  state: { count: 0 }
});

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

const app = new Vue({
  el: "#app",
  components: { Counter },
  store,
  template: `<div id="app"><counter></counter></div>`
});

// providing the store option to root instance,we could get store as this.$store
import { mapState } from "vuex";

const Counter = {
  template: `<div>{{count}}</div>`,
  computed: {
    counter() {
      return this.$store.count;
    }
  },
  // if  we make use of multiple store state, we could use mapState helper as computed getter
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
