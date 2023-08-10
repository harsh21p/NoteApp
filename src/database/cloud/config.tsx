import * as firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAqfHitzUuRjrFGa3t4KlswuM1owrzTEw4',
  authDomain: 'noteapp-a7618.firebaseapp.com',
  projectId: 'noteapp-a7618',
  storageBucket: 'noteapp-a7618.appspot.com',
  messagingSenderId: '485033373899',
  appId: '1:485033373899:web:91034922507b6e33342b4e',
  measurementId: 'G-S4GBE1RN90',
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
