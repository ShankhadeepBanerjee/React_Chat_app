import { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signInUser, signOutUser } from "../features/userSlice";
import { populateContacts, resetContact } from "../features/contactsSlice";
import {
	addChat,
	resetConversation,
	setRecentChats,
} from "../features/conversationSlice";

// Tools
import { createUserIfNotExistsInDb, userExists } from "../tools/FirestoreTools";
import { doc, onSnapshot, updateDoc } from "@firebase/firestore";

import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "../firebaseConfig";

// Components
import Home from "../components/layout/Home";
import Screen1 from "../components/layout/Screen1";
import Screen2 from "../components/layout/Screen2";

// CSS
import "./App.css";

export default function App() {
	// This locks the "<Home/>" page and prompts user to choose options
	const [unLock, setUnLock] = useState(false);

	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	// All the useEffects and Listeners are here

	// This is for Auth State Change Listener
	useEffect(() => {
		const func = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				let { displayName, photoURL, email } = currentUser;

				(async () => {
					await createUserIfNotExistsInDb({
						displayName,
						photoURL,
						email,
					});
					dispatch(signInUser({ displayName, photoURL, email }));
					const userInDb = await userExists(email);
					dispatch(populateContacts(userInDb.contacts));
				})();
			} else {
				dispatch(signOutUser());
				dispatch(resetContact());
				dispatch(resetConversation());
				setUnLock(false);
				console.log("User Signed Out");
			}
		});
		return () => {
			func();
		};
	}, []);

	// This is for messageQue Listener

	useEffect(() => {
		if (!user.signedIn) return;
		const unsub = onSnapshot(doc(db, "Users", user.email), (snapShot) => {
			console.log(`Listening to ${user.email}'s data`);
			dispatch(setRecentChats(snapShot.data().RecentChats));
			(async () => {
				snapShot.data().messageQueue.length > 0 &&
					snapShot.data().messageQueue.forEach((message) => {
						console.log("Adding message", message);
						dispatch(addChat(message));
					});
				await updateDoc(doc(db, "Users", user.email), {
					messageQueue: [],
				});
			})();
		});
		return () => {
			unsub();
		};
	}, [user]);

	return (
		<div className="app">
			{unLock ? (
				<>
					<Screen1 />
					<Screen2 />
				</>
			) : (
				<Home lockSetter={setUnLock} />
			)}
		</div>
	);
}
