const FETCH = 'change_loading'

const state = {
    loading: false
}

const actions = {
    toggleLoading({ commit }, loading = false) {
        return commit(FETCH, loading)
    }
}

const mutations = {
    [FETCH](state, loading) {
        return state.loading = loading;
    }
}

const store = {
    state,
    actions,
    mutations
}
export default store