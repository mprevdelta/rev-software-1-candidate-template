import { createApp } from 'vue'
import { createStore } from 'vuex'

import './style.css'
import App from './App.vue'
import Loading from './components/Loading.vue'
import PickupRequest from './components/maps/PickupRequest.vue'

import $api from './plugins/api'
import appStore from './plugins/app-store'

async function main() {
    const app = createApp(App)

    app.provide('$api', $api)

    app.component('Loading', Loading)
    app.component('PickupRequest', PickupRequest)

    const $store = createStore(appStore)
    app.use($store)
    app.provide('$store', $store)

    app.mount('#app')
}

main()
