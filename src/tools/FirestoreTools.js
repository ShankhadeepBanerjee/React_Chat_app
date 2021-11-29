import { auth, db } from "../firebaseConfig";
import {
	doc,
	getDoc,
	setDoc,
	arrayUnion,
	writeBatch,
} from "firebase/firestore";

async function createUserIfNotExistsInDb(currentUser) {
	const { displayName, photoURL, email } = currentUser;
	const exists = await userExists(email);
	if (exists) return;
	console.log("Creating User in Firestore", currentUser);
	let UsersDocRef = doc(db, "Users", email);
	await setDoc(UsersDocRef, {
		displayName,
		photoURL,
		email,
		contacts: [],
		messageQueue: [],
		RecentChats: {},
		unreadMessages: {},
	});
	console.log("User Created");
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
	const batch = writeBatch(db);
	console.log("adding Chat");
	let docRefSender = doc(db, `Users/${Sender}/Chats`, Receiver);
	let docRefReceiver = doc(db, `Users/${Receiver}/Chats`, Sender);
	batch.update(docRefSender, { chats: arrayUnion(chat) });
	batch.update(docRefReceiver, { chats: arrayUnion(chat) });

	// This is so that Reciever gets new messages, while online,
	// without lisening to db for every specific contact
	// inserting chats to "messageQueue" and "RecentChats" of receiver and Sender
	let docRefp3 = doc(db, `Users/`, Sender);
	batch.set(
		docRefp3,
		{
			RecentChats: { [`${Receiver}`]: chat },
		},
		{ merge: true }
	);
	let docRefp4 = doc(db, `Users/`, Receiver);
	batch.set(
		docRefp4,
		{
			messageQueue: arrayUnion(chat),
			RecentChats: { [`${Sender}`]: chat },
		},
		{ merge: true }
	);

	await batch.commit();
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

function setUnreadMessageCountToZeroInDB(contact) {
	const user = auth.currentUser;
	const docRef = doc(db, "Users/", user.email);
	setDoc(docRef, { unreadMessages: { [contact.email]: 0 } }, { merge: true });
}

export {
	createUserIfNotExistsInDb,
	userExists,
	createChatDocOfSenderAndReceiverIfNotExist,
	addChatToSenderAndReceiverDb,
	addContactToDb,
	getChats,
	setUnreadMessageCountToZeroInDB,
};
