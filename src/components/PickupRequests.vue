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
                <tr v-for="pr in (requestsWithMetadata || [])" :key="pr.id" @click="selectPickupRequest(pr)">
                    <td>{{ pr.count }}</td>
                    <td>{{ pr.ageInDays }}</td>
                    <!-- <td>
                        <button @click="deletePickupRequest(pr.id)">Delete</button>
                    </td> -->
                </tr>
            </tbody>
        </table>
    </template>
</template>

<script setup>
import useSWRV from 'swrv'
import { computed, inject } from 'vue';

const $api = inject('$api')
const $store = inject('$store')

const swrv = useSWRV('/api/pickup-requests', async (url) => {
    const res = await $api.get(url);
    return res.data
}, { revalidateOnFocus: false })

const requestsWithMetadata = computed(() => {
    if(! swrv.data.value) {
        return null
    }

    const now = new Date()

    return swrv.data.value.map(pr => {
        const createdAt = new Date(pr.createdAt)
        const age = now - createdAt
        const ageInDays = Math.floor(age / (1000 * 60 * 60 * 24));
        
        return {
            original: pr,
            ageInDays,
            count: pr.count
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
    ;
}

td {
    text-align: center;
    cursor: pointer;
}
</style>