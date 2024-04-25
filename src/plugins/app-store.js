// Vuex "store" that holds the state of the client

export default {
    state: {
        maps: null, // Google Maps API instance in form {map, api} for convenience
        selectedDriver: null,
        selectedPickupRequest: null
    },
    mutations: {
        setSelectedDriver(state, newVal) {
            state.selectedDriver = newVal
        },
        setSelectedPickupRequest(state, newVal) {
            state.selectedPickupRequest = newVal
        },
        setMaps(state, newVal) {
            state.maps = newVal
        }
    },
    actions: {
        setSelectedDriver({ commit }, newVal) {
            commit('setSelectedDriver', newVal)
        },
        setSelectedPickupRequest({ commit }, newVal) {
            commit('setSelectedPickupRequest', newVal)
        },
        setMaps({ commit }, newVal) {
            commit('setMaps', newVal)
        }
    }
}
