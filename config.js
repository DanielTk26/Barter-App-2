import firebase from "firebase";
require("@firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyDbu6umHXapt7kbDXhjkK7LPgDbcULaqkc",
  authDomain: "barter-app-8e887.firebaseapp.com",
  projectId: "barter-app-8e887",
  storageBucket: "barter-app-8e887.appspot.com",
  messagingSenderId: "322263957293",
  appId: "1:322263957293:web:3b0cc6abdebf72c518dda4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
