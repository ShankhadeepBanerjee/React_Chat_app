import { doc, setDoc } from "@firebase/firestore";
import { db } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

function signInWithGoogle() {
	const provider = new GoogleAuthProvider();
	signInWithPopup(auth, provider)
		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode + errorMessage);
		});
}

async function firebaseSignOut() {
	await setUserStatusOffline(auth.currentUser);
	signOut(auth);
}

async function setUserStatusOnline(user) {
	let docRef1 = doc(db, `Status/`, user.email);
	await setDoc(docRef1, { isOnline: true });
}

async function setUserStatusOffline(user) {
	let docRef1 = doc(db, `Status/`, user.email);
	await setDoc(docRef1, { isOnline: false });
	console.log("Status set to false");
}

export {
	signInWithGoogle,
	firebaseSignOut,
	setUserStatusOnline,
	setUserStatusOffline,
};
