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
