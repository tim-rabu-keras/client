<template lang="html">
  <a-scene>
    <a-assets>
      <img id="skyy" src="../assets/night.jpg" alt="a sky" />
      <img id="floorthree" src="../assets/flooor3.jpg" alt="a floor" />
    </a-assets>

    <a-sky src="#sky" rotation="0 65 0"></a-sky>
    <a-plane
      material="color: #FFFFFF; src:#floorthree; repeat: 5000 5000"
      rotation="-90 0 0"
      scale="10000 10000 1"
    ></a-plane>
  </a-scene>
</template>

<script>
export default {
  name: 'RoomCard',
};
</script>

<style></style>
