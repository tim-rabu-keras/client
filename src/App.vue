<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="brand">Trivia Quiz |</span>
        <span class="font-weight-light"> Benar Salah</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn dark class="qbsBtn" @click="accountDialog = true" origin="center center">Create Account</v-btn>
    </v-toolbar>
    <router-view />
    <v-layout row justify-center>
    <v-dialog v-model="accountDialog" max-width="300px">
        <v-card>
          <v-card-title>
            <span class="headline">Create Account</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap align-center justify-center fill-height>
                <v-flex xs12 sm6 md6 lg6>
                  <v-text-field label="Username" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="accountDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat>Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
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
      accountDialog: false,
    };
  },
  mounted() {
    this.$store.dispatch('getAllRooms')
    console.log(this.$store.state.rooms, 'ini room')
  }
}
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
