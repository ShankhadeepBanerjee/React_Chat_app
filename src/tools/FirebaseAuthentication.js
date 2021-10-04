import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth";

const auth = getAuth();

function signInWithGoogle() {
	const provider = new GoogleAuthProvider();
	signInWithPopup(auth, provider)
		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			const user = result.user;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.email;
			const credential = GoogleAuthProvider.credentialFromError(error);
			console.log(errorCode + errorMessage);
		});
}

function firebaseSignOut() {
	signOut(auth)
		.then(() => {})
		.catch((error) => {});
}

export { signInWithGoogle, firebaseSignOut };
