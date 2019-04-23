<template>
  <a-scene embedded id="vr">
    <a-assets>
      <!-- sky -->
      <img id="asky" src="../assets/clouds.jpg" alt="" />
      <img id="asky2" src="../assets/heic0714g.jpg" alt="" />
      <!-- floor -->
      <img id="floor" src="../assets/crop.jpeg" alt="" />
    </a-assets>
    <a-sky src="#asky" rotation="0 65 0" repeat="#asky" v-if="test"></a-sky>
    <a-sky src="#asky2" rotation="0 65 0" repeat="#asky" v-else></a-sky>
    <a-plane
      material="color: #FFFFFF; src:#floor; repeat: 5000 5000"
      rotation="-90 0 0"
      scale="10000 10000 1"
    >
    </a-plane>

    <!-- <a-entity
      @click="box"
      geometry="primitive: box"
      material="color: pink"
      position="-2 2.2 -1.5"
      cursor="rayOrigin: mouse"
      foo
    >
    </a-entity> -->
    <!-- <a-entity position="0 1 -6" obj-model="obj: #brain-obj; mtl: #brain-mtl" ></a-entity> -->
    <!-- <a-entity position="-20 0.7 -20" obj-model="obj: #bb-obj; mtl: #bb-mtl" scale="0.01 0.01 0.01" animation="property: position; from: -22 0.8 -22; to: -22 0.8 22; loop: true; dir: alternate; easing:linear;dur:10000"></a-entity> -->
    <a-text color="#7d430e" position="6 3 -6" width="10" align="right" :value="point"></a-text>

    <a-text
      @click="createroom"
      cursor="rayOrigin: mouse"
      width="22"
      value="create room"
      geometry="primitive:plane"
      animation="property: position; from: -6 0.7 -5; to: -6 0.9 -5; loop: true; dir: alternate; easing:linear;dur:1000"
    >
    </a-text>
    <a-text
      @click="joinroom"
      width="22"
      align="right"
      cursor="rayOrigin: mouse"
      value="joinroom"
      geometry="primitive:plane"
      animation="property: position; from: 6 0.7 -5; to: 6 0.9 -5; loop: true; dir: alternate; easing:linear;dur:1000"
    ></a-text>
  </a-scene>
</template>

<script>
export default {
  name: 'aframe',
  data() {
    return {
      point: 1,
      test: true,
    };
  },
  methods: {
    createroom() {
      this.test = false;
      // this.ischeck = false;
      this.$router.push('/createroom');
    },
    joinroom() {
      this.test = true;
      this.$router.push('/rooms');
    },
  },
};
</script>

<style scoped>
#id {
  height: 740px;
}
</style>
