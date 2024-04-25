<template>
    <div ref="themap" id="themap">
        height
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader';

const themap = ref(null)

const props = defineProps({
    googleKey: {
        type: String,
        required: true
    }
})

const loader = new Loader({
    apiKey: props.googleKey,
    version: "weekly",
    libraries: ["places", "drawing"]
});

let google = null

const [libCore, libMaps, libMarker, libGeocoding] = await Promise.all([
    loader.importLibrary('core'),
    loader.importLibrary('maps'),
    loader.importLibrary('marker'),
    loader.importLibrary('geocoding')
])

let mapsApi = { ...libCore, ...libMaps, ...libMarker, ...libGeocoding }

let mapOptions = {
    mapTypeId: 'hybrid',
    tilt: 0,
    heading: 0,
    isFractionalZoomEnabled: false,
    zoomControl: true,
    panControl: false,
    tiltControl: false,
    rotateControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
    draggableCursor: 'auto'
}
let usa = { lat: 37.09024, lng: -95.712891 }
mapOptions.mapId = '7b79128ec73ebb05'
mapOptions.center = usa
mapOptions.zoom = 5

onMounted(() => {
    let map = new mapsApi.Map(themap.value, mapOptions)
})
</script>

<style lang="css">
#themap {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    background: red;
}
</style>