import "./App.css";
import Home from "../components/layout/Home";
import Screen1 from "../components/layout/Screen1";
import Screen2 from "../components/layout/Screen2";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signInUser, signOutUser } from "../features/userSlice";
import { createUserIfNotExistsInDb, userExists } from "../tools/FirestoreTools";
import { arrayUnion, doc, onSnapshot, updateDoc } from "@firebase/firestore";
import { useEffect } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "../firebaseConfig";
import { populateContacts, resetContact } from "../features/contactsSlice";
import { addChat, resetConversation } from "../features/conversationSlice";

export default function App() {
	// All the useEffects and Listeners are here

	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	// This is for Auth State Change Listener
	useEffect(() => {
		const func = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				let { displayName, photoURL, email } = currentUser;
				dispatch(signInUser({ displayName, photoURL, email }));
				(async () => {
					await createUserIfNotExistsInDb({
						displayName,
						photoURL,
						email,
					});
					const userInDb = await userExists(email);
					dispatch(populateContacts(userInDb.contacts));
				})();
			} else {
				dispatch(resetContact());
				dispatch(resetConversation());
				dispatch(signOutUser());
				console.log("User Signed Out");
			}
		});
		return () => {
			func();
		};
	}, []);

	// This is for messageQue Listener
	useEffect(() => {
		const unsub = (async () => {
			user.signedIn &&
				(await userExists(user.email)) &&
				onSnapshot(doc(db, "Users", user.email), (snapShot) => {
					(async () => {
						await snapShot
							.data()
							.messageQueue.forEach((message) => {
								dispatch(addChat(message));
								(async () => {
									await updateDoc(
										doc(
											db,
											`Users/${message.to}/Chats`,
											message.from
										),
										{ chats: arrayUnion(message) }
									);
								})();
							});
						await updateDoc(doc(db, "Users", user.email), {
							messageQueue: [],
						});
					})();
				});
		})();
		return () => {
			unsub;
		};
	}, [user]);

	return (
		<div className="app">
			{!user.signedIn ? (
				<Home />
			) : (
				<>
					<Screen1 />
					<Screen2 />
				</>
			)}
		</div>
	);
}
