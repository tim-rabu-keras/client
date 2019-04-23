<template>
  <v-app ref="refApp">
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
            <v-container>
              <v-layout wrap align-center justify-center fill-height>
                <v-flex xs12 sm12 md12 lg12>
                  <v-text-field label="Username" v-model="userName" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="accountDialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="createUser">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout>
    <v-dialog
      v-model="$store.state.keyForm"
      class="keyForm"
      width="500"
    >
      <v-card>
        <v-container>
            <v-layout wrap align-center justify-center fill-height>
              <v-flex xs12 sm12 md12 lg12>
                <v-text-field v-bind:error="isError" v-bind:error-message="message" label="Enter Room Key" v-model="roomKey" required></v-text-field>
              </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="joinRoom"
          >
          Join
          </v-btn>
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
      userName: '',
      roomKey: '',
      isError: false,
      message: '',
    };
  },
  methods: {
    createUser: function() {
      this.$store.dispatch('createUser', this.userName)
      .then(response => {
        this.accountDialog = false;
      })
    },
    joinRoom: function() {
      this.isError = false;

      if(this.$store.state.room.key === this.roomKey) {
        this.$store.dispatch('joinRoom', {id: this.$route.params.id, ...this.$store.state.room})

      }
      else {
        this.isError = true;
        this.message = 'Incorrect key. Please try again.'
      }
    },
  },
  mounted() {
    this.$store.dispatch('getAllRooms')
    console.log(this.$store.state.room, 'ini room')
    this.$store.dispatch('getAllQuiz')
    console.log(this.$store.state.quiz.allQuiz, 'ini quiz')
  },
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
