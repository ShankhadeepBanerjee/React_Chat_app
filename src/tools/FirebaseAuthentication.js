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

function firebaseSignOut() {
	signOut(auth)
		.then(() => {})
		.catch((error) => {});
}

// async function setUserStatusOnline(user) {
// 	let docRef1 = doc(db, `Status/`, user.email);
// 	await setDoc(docRef1, { status: "online"});
// }

export { signInWithGoogle, firebaseSignOut };
