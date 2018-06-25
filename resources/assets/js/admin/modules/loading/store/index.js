const ADMIN_CONTENT_LOADING = 'admin_content_loading';

const state = {
    contentLoading :false
}

const mutations = {
    [ADMIN_CONTENT_LOADING](state, { loading }) {
        state.contentLoading = loading;
    },
}

const actions = {
    setAdminContentLoading({ commit }, loading) {
        commit(ADMIN_CONTENT_LOADING, { loading });
    }
}

const storeLoading = {
    state,
    mutations,
    actions,
}

export default storeLoading;