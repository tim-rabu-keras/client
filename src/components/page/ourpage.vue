<template lang="html">
  <div>
    <a-scene embedded>
      <a-assets>
        <img id="asky" src="../../assets/skyssssss.jpg" alt="" />
      </a-assets>
      <a-sky src="#asky" rotation="0 65 0"></a-sky>
    </a-scene>
  </div>
</template>

<script>
export default {
  name: 'aframe',
};
</script>

<style lang="css" scoped></style>
