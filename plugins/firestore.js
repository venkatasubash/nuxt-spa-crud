import Vue from "vue";
import firebase from "firebase/app";
import "firebase/firestore";
import { firestorePlugin } from "vuefire";

Vue.use(firestorePlugin);

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyASmCb-ocsqqiuEWu99DbJChEVhHgSkZhk",
  authDomain: "samp-96c4e.firebaseapp.com",
  databaseURL: "https://samp-96c4e.firebaseio.com",
  projectId: "samp-96c4e",
  storageBucket: "samp-96c4e.appspot.com",
  messagingSenderId: "895306081831",
  appId: "1:895306081831:web:128d5f5899e80d40",

  clientId:
    "895306081831-gt8b028u21adrg57gak49ct4rse634h2.apps.googleusercontent.com",

  scopes: ["email", "profile"]
});

const db = firebaseApp.firestore();

firebase
  .firestore()
  .enablePersistence()
  .catch(function(err) {
    if (err.code == "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
      // ...
    } else if (err.code == "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
      // ...
    }
  });

export default db;
