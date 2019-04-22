import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB0lI3gxtjdfJv72Jrb9cfrJxedIe3Fzdw',
  authDomain: 'quizbenarsalah.firebaseapp.com',
  databaseURL: 'https://quizbenarsalah.firebaseio.com',
  projectId: 'quizbenarsalah',
  storageBucket: 'quizbenarsalah.appspot.com',
  messagingSenderId: '316734729285',
};
firebase.initializeApp(config);

const db = firebase.firestore();

export default db;
