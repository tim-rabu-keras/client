/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { async } from 'q';
import db from './api/firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    room: '',
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
      db.collection('rooms')
        .doc(payload.id)
        .set({ players: [{ name: payload.name, score: 0 }] }, { merge: true })
        .then((response) => {
          if (response !== null) {
            context.dispatch('getAllRooms');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createUser(context, payload) {
      db.collection('user')
        .add({
          name: payload.name,
          score: 0,
          status: 'idle',
        })
        .then((response) => {
          localStorage.setItem('id', response.id);
          localStorage.setItem('name', response.name);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createRoom(context, payload) {
      db.collection('room')
        .add({
          status: 'idle',
          players: [{ userId: localStorage.getItem('id') }],
          key: payload.key,
        })
        .then((response) => {
          this.$router.push(`/rooms/${response.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAllRooms(context) {
      console.log('masuk ke all');
      // context.commit('changeRooms', []);
      db.collection('room').onSnapshot((querySnapshot) => {
        console.log(querySnapshot);
        console.log(typeof querySnapshot);
        querySnapshot.forEach((doc) => {
          // console.log(doc.data())
          console.log(doc, 'ini doc');
          context.commit('changeRooms', { id: doc.id, ...doc.data() });
        });
      });
    },
    getOneRoom(context, id) {
      context.commit('changeRoom', '');
      db.collection('room')
        .doc(id)
        .onSnapshot((querySnapshot) => {
          console.log(querySnapshot);
          context.commit('changeRoom', querySnapshot.data());
        });
    },
    startGame(context, id) {
      db.collection('room')
        .doc(id)
        .update({
          status: 'active',
        })
        .then(response => db
          .collection('user')
          .doc(localStorage.getItem('id'))
          .update({
            status: 'active',
          }))
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
