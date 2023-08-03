import * as firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBFQN1AuiLpLhjO9YnBpiuSPWfmZD3jwj0',
  authDomain: 'note-app-react-native-b8ac8.firebaseapp.com',
  projectId: 'note-app-react-native-b8ac8',
  storageBucket: 'note-app-react-native-b8ac8.appspot.com',
  messagingSenderId: '865705260205',
  appId: '1:865705260205:web:7a2aee353b0796d9e50224',
  measurementId: 'G-1TDWX8Z261',
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
