// 需要传入的是触发的事件类型，以及用于组合新数据的负荷
//similar as event(eventType,callback(state,payload));


//定义类型：mutation-types.js
export const INCREMENT = 'INCREMENT';
export const ADD = 'ADD';


//数据仓库：store.js
import Vuex from 'vuex';
import {INCREMENT, ADD} from './mutation-types';

const store = new Vuex.store({
    store: {count: 0},
    mutations: {
        [INCREMENT]: state => state.count++,// state change
        [ADD](state, payload) {
            return state.count + payload.amount
        }
    }
});


// NOTICE: 如果在实例创建之后添加新的属性到实例上，它不会触发视图更新, 对于mutations也是如此,所以最好建议初始化就完成所有属性的添加
Vue.set(obj, 'newName', 123);//add
state.obj = {...state.obj, newName: 123}; // replace obj

// but we can't directly call a mutation callback(handler); need commit this mutation;
store.commit('increment');
// store.commit('add', {amount: 10});
store.commit({type: "add", amount: 10}); // type property is identified as mutations type;

//同样的使用mapXXX进行简化
import {mapMutations} from 'vuex';
export default {
    methods: {
        ...mapMutations([
            'increment' // map this.increment to this.$store.commit('increment')
        ])
    }
}


// question：why all mutation must be synchronous？
// 因为回调函数中有异步函数，触发mutation后调用回调函数改变state的时机不能追踪；
