import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseSDK from "./firebaseSDK";
const firebaseConfig = {
	apiKey: firebaseSDK.APIKEY,
	authDomain: firebaseSDK.AUTHDOMAIN,
	projectId: firebaseSDK.PROJECTID,
	storageBucket: firebaseSDK.STORAGEBUCKET,
	messagingSenderId: firebaseSDK.MESSAGINGSENDERID,
	appId: firebaseSDK.APPID,
	measurementId: firebaseSDK.MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };
