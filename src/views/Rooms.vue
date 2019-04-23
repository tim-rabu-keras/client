<template>
    <router-view/>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Room",
  computed: {
    computed: mapState(["rooms"])
  }
};
</script>

<style>
</style>
