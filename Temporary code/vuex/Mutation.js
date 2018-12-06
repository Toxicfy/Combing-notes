// similar as event(eventType,callback(state));


const store = new Vuex.store({
    store: {count: 0},
    mutations: {
        increment: state => state.count++ // state change
    }
});


// but we can't directly call a mutation callback(handler); need commit this mutation;
store.commit('increment');