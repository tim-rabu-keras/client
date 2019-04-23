<template>
<div>
    <allRoom/>
    <router-view/>
</div>
</template>

<script>
import allRoom from '@/components/Room.vue'
import { mapState } from "vuex";
export default {
  name: "Room",
  components: {
      allRoom
    },
  computed: {
    computed: mapState(["position"])
  }
};
</script>

<style>
</style>
