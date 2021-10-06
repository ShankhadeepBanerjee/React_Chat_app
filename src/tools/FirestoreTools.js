import { auth, db } from "../firebaseConfig";
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

async function createChatDocOfSenderAndReceiverIfNotExist(Sender, Receiver) {
	let docRef1 = doc(db, `Users/${Sender}/Chats`, Receiver);
	let docRef2 = doc(db, `Users/${Receiver}/Chats`, Sender);
	let docSnap = await getDoc(docRef1);
	if (docSnap.exists()) {
		console.log("already exists");
		return { exists: true };
	}
	console.log(`Creating Chatdoc for ${Sender} and ${Receiver}`);
	await setDoc(docRef1, { chats: [] });
	await setDoc(docRef2, { chats: [] });
	return { exists: false };
}
async function addChatToSenderAndReceiverDb(Sender, Receiver, chat) {
	// await createChatDocOfSenderAndReceiverIfNotExist(Sender, Receiver);
	console.log("adding Chat");
	let docRefSender = doc(db, `Users/${Sender}/Chats`, Receiver);
	let docRefReceiver = doc(db, `Users/${Receiver}/Chats`, Sender);
	await updateDoc(docRefSender, { chats: arrayUnion(chat) });
	await updateDoc(docRefReceiver, { chats: arrayUnion(chat) });

	// This is so that Reciever gets new messages, while online,
	// without lisening to db for every specific contact
	let docRefp3 = doc(db, `Users/`, Receiver);
	await updateDoc(docRefp3, { messageQueue: arrayUnion(chat) });
}

async function getChats(Sender, Receiver) {
	console.log("fetching");
	const docRef = doc(db, `Users/${Sender}/Chats`, Receiver);
	const snapShot = await getDoc(docRef);
	return snapShot.data().chats;
}

async function addContactToDb(contact) {
	let user = auth.currentUser;
	if (!contact.name || !contact.email) return;
	const existUser = await userExists(contact.email);

	let bufferContact;
	if (existUser) {
		bufferContact = { ...contact, pic: existUser.photoURL };
		await setDoc(
			doc(db, `Users/`, user.email),
			{
				contacts: { [bufferContact.email]: bufferContact },
			},
			{ merge: true }
		);
		await createChatDocOfSenderAndReceiverIfNotExist(
			user.email,
			contact.email
		);
		return bufferContact;
	} else {
		alert("This user doesn't exist!!!");
		return false;
	}
}

export {
	createUserIfNotExistsInDb,
	userExists,
	createChatDocOfSenderAndReceiverIfNotExist,
	addChatToSenderAndReceiverDb,
	addContactToDb,
	getChats,
};
