<template>
    <template v-if="swrv.isValidating.value">
        <Loading />
    </template>
    <template v-else>
        <table>
            <thead>
                <tr>
                    <th colspan="2">PICKUP REQUESTS</th>
                </tr>
                <tr>
                    <th>Count</th>
                    <th>Age (Days)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="o in (requestsWithMetadata || [])" :key="o.key" @click="selectPickupRequest(o.original)"
                    :class="o.class">
                    <td>{{ o.count }}</td>
                    <td>{{ o.ageInDays }}</td>
                    <!-- <td>
                        <button @click="deletePickupRequest(pr.id)">Delete</button>
                    </td> -->
                </tr>
            </tbody>
        </table>

        <Teleport to="#themap">
            <PickupRequest v-for="pr in (requestsWithMetadata || [])" :key="pr.id""
                :selected="pr.selected" :pickupRequest="pr.original" :ageInDays="pr.ageInDays" />
        </Teleport>
    </template>
</template>

<script setup>
import useSWRV from 'swrv'
import { computed, inject } from 'vue';
import PickupRequest from './maps/PickupRequest.vue';

const $api = inject('$api')
const $store = inject('$store')

const swrv = useSWRV('/api/pickup-requests', async (url) => {
    const res = await $api.get(url);
    return res.data
}, { revalidateOnFocus: false })

const requestsWithMetadata = computed(() => {
    if (!swrv.data.value) {
        return null
    }

    const now = new Date()

    return swrv.data.value.map(pr => {
        const createdAt = new Date(pr.createdAt)
        const age = now - createdAt
        const ageInDays = Math.floor(age / (1000 * 60 * 60 * 24));
        const selected = pr.id === $store.state.selectedPickupRequest?.id
        const clazz = selected ? ['selected'] : []

        return {
            key: pr.id,
            selected,
            original: pr,
            ageInDays,
            count: pr.count, class: clazz
        }
    })
})

function selectPickupRequest(pr) {
    $store.dispatch('setSelectedPickupRequest', pr)
}
</script>

<style lang="css" scoped>
table {
    width: 100%;
    padding: 0px;
    margin: 0px;
    border: none !important;
    border-collapse: collapse;
}

thead {
    position: sticky;
    background-color: #13688f;
    top: 0px;
    margin: 0px;
    width: 100%;
    border-collapse: collapse;
    padding: 0.5em;
}

th {
    padding: 0.5em;
    margin: 0px;
}

tr {
    cursor: pointer;
}

tr:hover {
    background-color: #13688f;
}

td {
    text-align: center;
    cursor: pointer;
}

tr.selected {
    text-decoration: underline;
    background-color: #13688f;
}
</style>