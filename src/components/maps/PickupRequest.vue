<template>
</template>

<script setup>
import { inject, toRaw, onMounted, onUnmounted, watch } from 'vue';
import PickupRequests from '../PickupRequests.vue';

const props = defineProps(['pickupRequest', 'ageInDays', 'selected'])

const $store = inject('$store')

const maps = $store.state.maps

// let marker = new maps.api.Marker({
//     position: props.pickupRequest.location,
//     map: maps.map,
//     label: props.pickupRequest.count.toString()
// })

let marker = null

watch(props, () => {
    if(marker) {
        marker.setMap(null)
    }

    const content = document.createElement('div')

    content.classList.add("pickup-request")

    if (props.ageInDays <= 30) {
        content.classList.add('pr-new')
    }
    else if (props.ageInDays <= 90) {
        content.classList.add('pr-middle')
    }
    else {
        content.classList.add('pr-old')
    }

    if (props.selected) {
        content.classList.add('pr-selected')

    }

    content.innerHTML = props.pickupRequest.count.toString() + " Roll(s)<br>" + props.ageInDays + " Days"

    const options = {
        position: props.pickupRequest.location,
        content,
        map: toRaw(maps.map)
    }

    marker = new maps.api.AdvancedMarkerElement(options)
}, {immediate: true})

onUnmounted(() => {
    marker?.setMap(null)
})
</script>

<style lang="css">
.pickup-request {
    padding: 2px;
    text-align: center;
    font-weight: bold;
    color: var(--fg0);
}

.pr-new {
    background-color: #31904466;
}

.pr-middle {
    background-color: rgba(255, 198, 92, 0.65);
}

.pr-old {
    background-color: rgba(255, 0, 0, 0.65);
}

.pr-selected {
    border: 3px solid white;
}
</style>