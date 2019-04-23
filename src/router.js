import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/rooms',
      name: 'room',
      component: () => import('./views/Rooms.vue'),
      children: [
        {
          path: ':id',
          name: 'roomone',
          component: () => import('./components/room/roomone.vue'),
        },
      ],
    },
    {
      path: '/createroom',
      name: 'createroom',
      component: () => import('./views/CreateRoom.vue'),
    },
    {
      path: '/join/:id',
      name: 'joinRoom',
      component: () => import('./views/JoinRoom.vue'),
    },
  ],
});
