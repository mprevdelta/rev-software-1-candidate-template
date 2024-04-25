<script setup>
import { computed, inject } from 'vue';
import useSWRV from 'swrv'

import GoogleMaps from './components/GoogleMaps.vue'

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
</script>

<template>
  <div class="root">
    <template v-if="!googleKey">
      <div style="font-style: italic;">Loading...</div>
    </template>
    <template v-else>
      <div class="pickup-requests">Pickup Requests</div>
      <div class="the-map">
        <Suspense>
          <template #default>
            <GoogleMaps :googleKey="googleKey" />
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
  background-color: #303f4c;
  width: 100vw;
  height: 100vh;
  padding: 0px;
  margin: 0px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.pickup-requests {
  min-width: min(20vw, 20em);
}

.the-map {
  flex-grow: 1;
  position: relative;
}

.drivers {
  min-width: min(20vw, 20em);
}
</style>
