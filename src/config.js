import firebase from "firebase/app";
import firestore from "firebase"


var firebaseConfig = {
    apiKey: "AIzaSyDCAU_6V17T3ZwMYnYzo4BIoQ7wmv32AHA",
    authDomain: "chat-app-d116c.firebaseapp.com",
    projectId: "chat-app-d116c",
    storageBucket: "chat-app-d116c.appspot.com",
    messagingSenderId: "117866356263",
    appId: "1:117866356263:web:917b03ec83f43f9de53802"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default firebase; 
export {db, firestore };