import firebase from "firebase/app";
import firestore from "firebase";
import firebaseConfig from "./config";

var fbConfig = {
	apiKey: firebaseConfig.apiKey,
	authDomain: firebaseConfig.authDomain,
	projectId: firebaseConfig.projectId,
	storageBucket: firebaseConfig.storageBucket,
	messagingSenderId: firebaseConfig.messagingSenderId,
	appId: firebaseConfig.appId,
};

firebase.initializeApp(fbConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
export default firebase;
export { db, auth, storage, firestore };
