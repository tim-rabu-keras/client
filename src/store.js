/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import db from './api/firebase';
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
    quiz: {
      allQuiz: [],
      oneQuiz: '',
    },
    user: {
      name: '',
      score: 0,
    },
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
  },
  actions: {
    getAllQuiz(context) {
      context.commit('changeAllQuiz', []);
      axios
        .get('https://opentdb.com/api.php?amount=50&type=boolean&difficulty=hard')
        .then((response) => {
          context.commit('changeAllQuiz', response);
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
      const docRef = db.collection("room").doc(payload.id);

      docRef.get()
        .then((response) => {
          data = response.data();
          data.players.push({ name: localStorage.getItem('name'), score: 0, status: 'active' });

          db.collection('room')
            .doc(payload.id)
            .update({ players: data.players })
            .then((result) => {
              console.log('**********', result);
              if (response !== null) {
                context.room('changeRoom', result);
              }
            });
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
    createRoom(context, payload) {
      db
        .collection('room')
        .add({
          status: 'idle',
          players: [{ userId: localStorage.getItem('id'), name: payload.name, status: 'active' }],
          key: payload.key,
        })
        .then((response) => {
          context.commit('changeRoom', response);
          router.push(`/rooms/${response.id}`);
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
            // console.log(doc.data())
            console.log(doc, 'ini doc')
            context.commit('changeRooms', { id: doc.id, ...doc.data() })
          });
        });
    },
    getOneRoom(context, id) {
      context.commit('changeRoom', '');
      db
        .collection('room')
        .doc(id)
        .onSnapshot((querySnapshot) => {
          context.state.room = querySnapshot.data();
        });
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
  },
});
