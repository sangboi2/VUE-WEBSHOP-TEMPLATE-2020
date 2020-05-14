 // Firebase configuration
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCCXm6k9_-wshAYjwbQdrJ6U0ulKpws3yI",
    authDomain: "vue-firestore-cf73d.firebaseapp.com",
    databaseURL: "https://vue-firestore-cf73d.firebaseio.com",
    projectId: "vue-firestore-cf73d",
    storageBucket: "vue-firestore-cf73d.appspot.com",
    messagingSenderId: "354828782382",
    appId: "1:354828782382:web:975419eb7c748834f008bf"
  };
  // Initialize Firebase
  // firebase.initializeApp(firebaseConfig); changed after image file created

  export const fb = firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore()
  export const dbMenuAdd = db.collection('menuItems');
  export const dbOrders = db.collection('orderItems');


