<template>
<v-layout row justify-center align-center>
    <v-flex xs12 sm8 md6 lg4>
        <v-card>
          <v-card-title>
            <span class="headline">Create Room</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-layout wrap align-center justify-center fill-height>
                <v-flex xs12 sm12 md12 lg12>
                  <v-text-field label="Room Name" v-model="newRoom.roomName" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12 lg12>
                  <v-text-field label="Key" v-model="newRoom.key" required></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue darken-1" flat to="/">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="$store.dispatch('createRoom', newRoom)">Submit</v-btn>
          </v-card-actions>
        </v-card>
        </v-flex>
    </v-layout>    
</template>

<script>
export default {
    name: 'CreateRoom',
    data() {
        return {
            newRoom: {
                roomName: '',
                players: [
                    {
                        userId: localStorage.getItem('id'),
                        name: localStorage.getItem('name')
                    }
                ],
                key: '',
                status: 'idle'
            },
        }
    }
}
</script>

<style>

</style>
