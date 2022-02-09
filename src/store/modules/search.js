import { pick } from "lodash";
import locales from '../../locale/locales';
import {getCityByLocationName} from "../../services/api";
import {getUserCitySearchHistory, subscribeOnSearchHistoryChange, setUserSearchHistory} from "../../services/storage";

let unsubscribeFromSearchHistoryChangeCallback = null;

const state = () => {
    return {
        searchHistory: [],
    }
}

const getters = {
    searchHistory: state => state.searchHistory,
}

const mutations = {
    ADD_HISTORY_ITEM(state, item) {
        if (!item ||
            !item.local_names ||
            state.searchHistory.find(city => city['en'] === item.local_names['en'])) {
            return;
        }

        state.searchHistory.unshift(pick(item.local_names, locales));
        setUserSearchHistory(state.searchHistory);
    },
    SET_HISTORY(state, value) {
        state.searchHistory = value;
    }
}

const actions = {
    addHistoryItem({ commit }, item) {
        commit('ADD_HISTORY_ITEM', item);
    },
    async searchCityByLocationName({ dispatch }, name) {
        const result = await getCityByLocationName(name);
        dispatch('addHistoryItem', result);
        return result;
    },
    fetchHistory({ commit }) {
        commit('SET_HISTORY', getUserCitySearchHistory());
    },
    subscribeOnHistoryChange({ commit }) {
        if (unsubscribeFromSearchHistoryChangeCallback) {
            return;
        }

        unsubscribeFromSearchHistoryChangeCallback = subscribeOnSearchHistoryChange((newValue) => {
            commit('SET_HISTORY', newValue);
        });
    },
    unsubscribeFromHistoryChange() {
        if (!unsubscribeFromSearchHistoryChangeCallback) {
            return;
        }

        unsubscribeFromSearchHistoryChangeCallback();
        unsubscribeFromSearchHistoryChangeCallback = null;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
