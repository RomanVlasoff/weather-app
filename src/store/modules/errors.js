const state = () => {
    return {
        error: null
    }
}

const getters = {
    error: state => state.error,
}

const mutations = {
    SET_ERROR(state, errorKey) {
        state.error = {
            errorKey,
            isShow: true
        }
    },
    CLEAR_ERROR(state) {
        state.error = null;
    }
}

const actions = {}

export default {
    state,
    getters,
    actions,
    mutations
}
