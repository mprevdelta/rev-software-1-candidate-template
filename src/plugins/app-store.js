// Vuex "store" that holds the state of the client

export default {
    state: {
        selectedDriver: null,
        selectedPickupRequest: null
    },
    mutations: {
        setSelectedDriver(state, newVal) {
            state.selectedDriver = newVal
        },
        setSelectedPickupRequest(state, newVal) {
            state.selectedPickupRequest = newVal
        }
    },
    actions: {
        setSelectedDriver({ commit }, newVal) {
            commit('setSelectedDriver', newVal)
        },
        setSelectedPickupRequest({ commit }, newVal) {
            commit('setSelectedPickupRequest', newVal)
        }
    }
}
