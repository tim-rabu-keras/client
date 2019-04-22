<template lang="html">
  <a-scene embedded id="vr">
    <a-assets>
      <!-- sky -->
      <img id="asky" src="../../assets/clouds.jpg" alt="" />
      <img id="asky2" src="../../assets/heic0714g.jpg" alt="" />
      <!-- floor -->
      <img id="floor" src="../../assets/crop.jpeg" alt="" />

      <!-- modelling -->
    </a-assets>
    <a-sky src="#asky" rotation="0 65 0" repeat="#asky" v-if="test"></a-sky>
    <a-sky src="#asky2" rotation="0 65 0" repeat="#asky" v-else></a-sky>
    <a-plane
      material="color: #FFFFFF; src:#floor; repeat: 5000 5000"
      rotation="-90 0 0"
      scale="10000 10000 1"
    >
    </a-plane>

    <a-text
      scale="1.5 2 3"
      v-for="(player, i) in players"
      color="#EEEE00"
      v-bind:position="positions[i].name"
      width="10"
      align="right"
      :value="player.name"
    ></a-text>
    <a-text
      v-for="(player, i) in players"
      :color="color"
      v-bind:position="positions[i].score"
      width="10"
      align="right"
      :value="player.score"
    ></a-text>

    <a-text
      cursor="rayOrigin: mouse"
      width="22"
      value="True"
      geometry="primitive:plane"
      animation="property: position; from: -6 0.7 -5; to: -6 0.9 -5; loop: true; dir: alternate; easing:linear;dur:1000"
    >
    </a-text>

    <a-text
      width="22"
      align="right"
      cursor="rayOrigin: mouse"
      value="False"
      geometry="primitive:plane"
      animation="property: position; from: 6 0.7 -5; to: 6 0.9 -5; loop: true; dir: alternate; easing:linear;dur:1000"
    ></a-text>
  </a-scene>
</template>

<script>
export default {
  name: 'roomone',
  data() {
    return {
      point: 1,
      test: true,
      color: '',
      positions: [
        {
          name: '2 3 -13',
          score: '3 3 -13',
        },
        {
          name: '2 4 -13',
          score: '3 4 -13',
        },
        {
          name: '2 5 -13',
          score: '3 5 -13',
        },
      ],
      players: [
        {
          name: 'budi',
          score: 0,
          status: 'idle',
        },
        {
          name: 'wawan',
          score: 4,
          status: 'idle',
        },
        {
          name: 'randi',
          score: 10,
          status: 'idle',
        },
      ],
    };
  },
  methods: {
    yes() {
      this.color = 'blue';
      this.point++;
      this.test = false;
    },
    no() {
      this.color = 'magenta';
      this.point++;
      this.test = true;
    },
  },
};
</script>

<style lang="css" scoped>
.vr {
  height: 740px
}
</style>
