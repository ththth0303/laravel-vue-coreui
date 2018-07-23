import {
    callApiFetch,
    callApiAdd,
    callApiEdit,
    callApiDelete,
    callApiShow
} from '../../api/user'

const FETCH = 'fetch_users'

const state = {
    users: []
}

const actions = {
    async getUsers({ commit }) {
        let response = await callApiFetch()
            
        return commit(FETCH, { users: response.data })
    }
}

const mutations = {
    [FETCH](state, { users }) {
        
        return state.users = users;
    }
}

const storeUser = {
    state,
    actions,
    mutations
}
export default storeUser