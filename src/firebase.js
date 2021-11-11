// import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCM9-AA8_1LyWgQjiq0S928Sd3OaNI461o",
    authDomain: "instagram-model-luke.firebaseapp.com",
    projectId: "instagram-model-luke",
    storageBucket: "instagram-model-luke.appspot.com",
    messagingSenderId: "894126802614",
    appId: "1:894126802614:web:d5ee67433483ef3e278817",
    measurementId: "G-H3YDSM3KJQ"
  });
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

export {db,auth,storage};