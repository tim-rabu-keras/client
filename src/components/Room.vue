<template>
    <v-container mt-5>
    <v-layout align-center justify-center row wrap>
        <v-flex v-for="(item, index) in this.$store.state.rooms" :key="index">
            <v-btn class="primary" @click="goto(item.id)">{{item.name}}</v-btn>
        </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
export default {
    methods: {
        goto(id) {
            this.$router.push(`/rooms/${id}`)
            this.$store.dispatch('joinRoom', {id})
            this.$store.dispatch('getOneRoom', id)
        }
    },
}
</script>

