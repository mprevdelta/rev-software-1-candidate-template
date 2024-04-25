import { createApp } from 'vue'
import { createStore } from 'vuex'

import './style.css'
import App from './App.vue'
import Api from './plugins/api'

async function main() {
    const app = createApp(App)

    app.provide('$api', Api)

    const $store = createStore({
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
    })
    app.use($store)
    app.provide('$store', $store)

    app.mount('#app')
}

main()
