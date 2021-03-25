// import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUIxcGvtICJAMkb09RO99l2zk2TGvNGPU",
    authDomain: "yowa-2a72d.firebaseapp.com",
    databaseURL: "https://yowa-2a72d.firebaseio.com",
    projectId: "yowa-2a72d",
    storageBucket: "yowa-2a72d.appspot.com",
    messagingSenderId: "15135651583",
    appId: "1:15135651583:web:1b8beeff302a40b1d7feca",
    measurementId: "G-FE63473M0T"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

export default firebase;