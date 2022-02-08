const state = () => {
    return {
        error: null
    }
}

const getters = {
    error: (state) => {
        return state.error;
    }
}

const actions = {}

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

export default {
    state,
    getters,
    actions,
    mutations
}
