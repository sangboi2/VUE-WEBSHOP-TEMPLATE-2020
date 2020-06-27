// Firebase configuration
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'
// Your web app's Firebase configuration
var firebaseConfig = {
  /*    apiKey: "AIzaSyCCXm6k9_-wshAYjwbQdrJ6U0ulKpws3yI",
     authDomain: "vue-firestore-cf73d.firebaseapp.com",
     databaseURL: "https://vue-firestore-cf73d.firebaseio.com",
     projectId: "vue-firestore-cf73d",
     storageBucket: "vue-firestore-cf73d.appspot.com",
     messagingSenderId: "354828782382",
     appId: "1:354828782382:web:975419eb7c748834f008bf" */

  apiKey: "AIzaSyA8zz7GnCZo04mNyELZXCkd-z-wMK-4SrA",
  authDomain: "vuetifyapp-b8373.firebaseapp.com",
  databaseURL: "https://vuetifyapp-b8373.firebaseio.com",
  projectId: "vuetifyapp-b8373",
  storageBucket: "vuetifyapp-b8373.appspot.com",
  messagingSenderId: "511632911932",
  appId: "1:511632911932:web:5ce66a1289985b9334dd39"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig); changed after image file created

export const fb = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const dbMenuAdd = db.collection('menuItems');
export const dbOrders = db.collection('orderItems');


