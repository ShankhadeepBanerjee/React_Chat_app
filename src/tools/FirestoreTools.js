import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

async function createUserIfNotExistsInDb(currentUser) {
	const { displayName, photoURL, email } = currentUser;
	const exists = await userExists(email);
	if (exists) return;
	console.log("Creating User in Firestore");
	let UsersDocRef = doc(db, "Users", email);
	await setDoc(UsersDocRef, {
		displayName,
		photoURL,
		email,
		contacts: [],
		messageQueue: [],
	});
}

async function userExists(userEmail) {
	let docRef = doc(db, "Users", userEmail);
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		return docSnap.data();
	}
	return false;
}

async function createChatDoc(p1, p2) {
	let docRef = doc(db, `Users/${p1}/Chats`, p2);
	let docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		console.log("already exists");
		return;
	}
	console.log(`Creating Chatdoc for ${p1} => ${p2}`);
	await setDoc(docRef, { chats: [] });
}
async function addChatToDb(p1, p2, chat) {
	await createChatDoc(p2, p1);
	console.log("adding Chat");
	let docRefp1 = doc(db, `Users/${p1}/Chats`, p2);
	let docRefp2 = doc(db, `Users/`, p2);
	await updateDoc(docRefp1, { chats: arrayUnion(chat) });
	await updateDoc(docRefp2, { messageQueue: arrayUnion(chat) });
}

async function getChats(p1, p2) {
	console.log("fetching");
	const docRef = doc(db, `Users/${p1}/Chats`, p2);
	const snapShot = await getDoc(docRef);
	return snapShot.data().chats;
}
export {
	createUserIfNotExistsInDb,
	userExists,
	createChatDoc,
	addChatToDb,
	getChats,
};
