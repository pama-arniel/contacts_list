import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCc2A-xLEnhyAkvhTk2aYE82OOARAxmAE0",
    authDomain: "contacts-list2.firebaseapp.com",
    projectId: "contacts-list2",
    storageBucket: "contacts-list2.appspot.com",
    messagingSenderId: "181070906879",
    appId: "1:181070906879:web:9f40db8c743b5992f393ca"
};

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }
