/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import db from './api/firebase';
import { async } from 'q';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keyForm: false,
    validPlayer: false,
    worlds: [
      {
        sky: '',
        plain: '',
      },
      {
        sky: '',
        plain: '',
      },
      {
        sky: '',
        plain: '',
      },
    ],
    rooms: [],
    room: null,
    allPlayers: [],
    quiz: {
      allQuiz: [],
      oneQuiz: '',
    },
    user: {
      name: '',
      score: 0,
    },
    position: false,
  },
  mutations: {
    setValidPlayer(state, payload) {
      state.validPlayer = payload;
    },
    setKeyForm(state, payload) {
      state.keyForm = payload;
    },
    changeAllQuiz(state, payload) {
      if (payload.length === 0) {
        state.quiz.allQuiz = [];
      } else {
        state.quiz.allQuiz = payload.results;
      }
    },
    changeOneQuiz(state, payload) {
      if (payload === '') {
        state.quiz.oneQuiz = '';
      } else {
        state.quiz.oneQuiz = state.quiz.allQuiz[payload];
      }
    },
    changeRooms(state, payload) {
      if (payload === []) {
        state.rooms = [];
      } else {
        state.rooms.push(payload);
      }
    },
    changeRoom(state, payload) {
      if (payload === '') {
        state.room = '';
      } else {
        state.room = payload;

      }
    },
    changePosition(state, payload) {
      state.position = payload;
    }
  },
  actions: {
    getAllQuiz(context) {
      context.commit('changeAllQuiz', []);
      axios
        .get('https://opentdb.com/api.php?amount=50&type=boolean&difficulty=hard')
        .then(({ data }) => {
          console.log(data.results, 'ini data')
          context.commit('changeAllQuiz', data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOneQuiz(context) {
      context.commit('changeOneQuiz', '');
      const random = Math.floor(Math.random() * 51);
      context.commit('changeOneQuiz', random);
    },
    joinRoom(context, payload) {
      context.state.keyForm = false;
      context.state.setValidPlayer = true;
      let data;
      let docRef = db.collection('room').doc(payload.id);

      db.collection('room').doc(payload.id).get()
        .then((response) => {
          data = response.data();
          if (data.players.length < 2) {
            if (data.players[0].userId !== localStorage.getItem('id')) {
              data.players.push({ userId: localStorage.getItem('id'), name: localStorage.getItem('name'), score: 0, status: 'active' });
              db.collection('room')
                .doc(payload.id)
                .update({ players: data.players })
                .then((result) => {
                  docRef = db.collection('room').doc(payload.id);
                  docRef.get().then((doc) => {
                    context.commit('changeRoom', doc.data());
                    context.commit('setValidPlayer', true);
                    context.commit('changePosition', true)
                  });
                });
            } else {
              router.push('/rooms');
            }
          } else {
            console.log('penuh');
            router.push('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkRoom(context, id) {
      db.collection('room').doc(id).get()
        .then((response) => {
          let activePlayers = [];
          if (response.players.length >= 2) {
            activePlayers = response.players.filter(x => x.player !== 'active');
            if (activePlayers.length === 0) {
              return db.collection('room')
                .doc(id)
                .update({ status: 'active' })
                .then((updated) => {
                  db.collection('room').doc(id).get()
                    .then((newRecord) => {
                      context.commit('changeRoom', newRecord);
                    })
                });
            }
          }
        });
    },
    createUser(context, payload) {
      console.log(`create user...${payload}`);
      db
        .collection('user')
        .add({
          name: payload,
          score: 0,
          status: 'idle',
        })
        // eslint-disable-next-line func-names
        .then((response) => {
          localStorage.setItem('id', response.id);
          localStorage.setItem('name', payload);
          router.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePosition(context) {
      context.commit('changePosition', true);
    },
    createRoom(context, payload) {
      console.log('masuk ke create room')
      console.log(payload, 'ini payload')
      db
        .collection('room')
        .add({
          name: payload.roomName,
          status: 'idle',
          players: [{
            userId: localStorage.getItem('id'),
            name: localStorage.getItem('name'),
            score: 0,
            status: 'active',
          }],
          key: payload.key,
          // question: [context.state.quiz.allQuiz],
        })
        .then((response) => {
          localStorage.setItem('room', response.id)
          console.log(response, 'ini responesssss')
          context.commit('changeRoom', response);
          context.commit('changePosition', false);
          context.dispatch('getOneRoom');
          router.push(`/rooms/${response.id}`);
          context.commit('changePosition', true)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllRooms(context) {
      console.log('masuk ke all');
      // context.commit('changeRooms', []);
      db
        .collection('room')
        .onSnapshot((querySnapshot) => {
          console.log(querySnapshot)
          console.log(typeof querySnapshot)
          querySnapshot.forEach((doc) => {
            console.log(doc.data(), 'ini doc =========')
            console.log(doc, 'ini doc')
            context.commit('changeRooms', { id: doc.id, ...doc.data() })
          });
        })
    },
    getOneRoom(context, id) {
      console.log('masuk ke one')
      context.commit('changeRoom', '');
      db
        .collection('room')
        .onSnapshot((querySnapshot) => {
          console.log(querySnapshot)
          console.log(typeof querySnapshot)
          querySnapshot.forEach((doc) => {
            // console.log(doc.data(), 'ini doc =========')
            if (id === doc.id) {
              context.commit('changeRoom', { id: doc.id, ...doc.data() });
            }
            // console.log(doc, 'ini doc')
          });
          // console.log(context.state.room)
        })
    },
    startGame(context, id) {
      db
        .collection('room')
        .doc(id)
        .update({
          status: 'active',
        })
        .then((response) => {
          return db
            .collection('user')
            .doc(localStorage.getItem('id'))
            .update({
              status: 'active',
            });
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closeRoom(context, id) {
      db.collection('room')
        .doc(id)
        .delete()
        .then(() => {
          router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
});
