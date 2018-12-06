// Vuex allows us to define "getters" in the store. You can think of them as computed properties for stores.
const store = new Vuex.store({
    state: {
        todos: [
            {id: 1, text: '...', done: true},
            {id: 2, text: '...', done: false},
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        },
        doneTodosCount: (state, getters) => {
            return getters.doneTodos.length;
        },
        getTodoById: (state) => (id) => {
            return state.todos.find(todo => todo.id === id)
        }
    }
});

//store.getter.doneTodos      --> [{id:1,text:'...',done:true}]
//store.getter.doneTodosCount --> 1
//store.getter.getTodoById(2) --> [{id:2,text:'...',done:false]


import {mapGetters} from "vuex";

// NOTICE:  getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的, 通过方法访问时，每次都会去进行调用，而不会缓存结果。
const app = new Vue({
    el: '#app',
    // computed: {
    //     doneTodosCount () {
    //         return this.$store.getters.doneTodosCount
    //     }
    // },
    computed: {
        ...mapGetters({ //map `this.doneCount` to `this.$store.getters.doneTodosCount`
            getDoneCounts: 'doneTodosCount'
        }),
        ...mapGetters([ // direct used
            'doneTodosCount',
            'getTodoById',
        ])
    }
});

// 通过 state/getter 我们可以直接获取到store中的数据，并且可以利用state中的数据派生状态（computed state）（到此我们依旧无法改变state）