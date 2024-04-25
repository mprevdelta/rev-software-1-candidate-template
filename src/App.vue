<script setup>
import { computed, inject, provide, reactive } from 'vue';
import useSWRV from 'swrv'

import GoogleMaps from './components/GoogleMaps.vue'
import PickupRequests from './components/PickupRequests.vue'

const $api = inject('$api')

const env = useSWRV('/vue-app-env', async (url) => {
  const res = await $api.get(url);
  return res.data
}, { revalidateOnFocus: false })

const googleKey = computed(() => {
  if (env?.data?.value?.VUE_APP_GOOGLE_MAPS_API_KEY?.length) {
    return env.data.value.VUE_APP_GOOGLE_MAPS_API_KEY
  }

  return null
})

const data = reactive({
  mapReady: false
})

function onMapReady(map) {
  data.mapReady = true
}
</script>

<template>
  <div class="root">
    <template v-if="!googleKey">
      <div style="font-style: italic;">Loading...</div>
    </template>
    <template v-else>
      <div class="pickup-requests">
        <PickupRequests v-if="data.mapReady"/>
      </div>
      <div class="the-map">
        <Suspense>
          <template #default>
            <GoogleMaps :googleKey="googleKey" @mapReady="onMapReady" />
          </template>
          <template #fallback>
            Initializing Map...
          </template>
        </Suspense>
      </div>
      <div class="drivers">Drivers</div>
    </template>
  </div>
</template>

<style scoped>
.root {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  color: white;
  background-color: #425565;
  padding: 0px;
  margin: 0px;
  top: 1em;
  left: 1em;
  right: 1em;
  bottom: 1em;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.pickup-requests {
  min-width: min(20vw, 20em);
  max-width: 20em;
  overflow: auto;
  position: relative;
  height: 100%;
}

.the-map {
  flex-grow: 1;
  position: relative;
  width: 100%;
  height: 100%;
}

.drivers {
  min-width: min(20vw, 20em);
}
</style>
