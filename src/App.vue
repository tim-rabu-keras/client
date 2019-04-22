<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="brand">Trivia Quiz |</span>
        <span class="font-weight-light"> Benar Salah</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn dark class="qbsBtn" origin="center center">Create Room</v-btn>
    </v-toolbar>
    <router-view />
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      //
    };
  },
};
</script>
<style <style scoped>

.brand {
  letter-spacing: 5px;
  font-weight: 700;
}

.title {
  font-size: 40px;
  letter-spacing: 2px;
}

.fullPanel {
  height: 100%;
}

.qbsBtn {
  font-size: 32px;
  border-radius: 20px;
  width: auto;
  height: 50px;
  transition: all 0.3s ease 0s;
}

.qbsBtn:hover {
  background-color: rgb(22, 105, 153);
  size: 70px;
  transform: scale(1.1);
  box-shadow: 3px 5px 24px 10px   rgba(67, 166, 231, 0.8);
}

</style>
