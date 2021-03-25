// import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'

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
  firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth()
export default firebase;