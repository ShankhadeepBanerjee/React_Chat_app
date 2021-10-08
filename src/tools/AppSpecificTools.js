import { getChats } from "./FirestoreTools";
import { setChatsFor, setPartner } from "../features/conversationSlice";

import { auth } from "../firebaseConfig";

function showScreen2() {
	const elem = document.querySelector(".screen2");
	elem.style["z-index"] = "2";
}

function getChatsForAPersoneAndShowOnChatsScreen(
	contact,
	conversationSelector,
	dispatchFunc
) {
	showScreen2();
	dispatchFunc(setPartner(contact));
	if (contact.email in conversationSelector.chats) return;
	(async () => {
		const chatsArray = await getChats(
			auth.currentUser.email,
			contact.email
		);
		dispatchFunc(setChatsFor({ to: contact.email, chats: chatsArray }));
	})();
}

export { getChatsForAPersoneAndShowOnChatsScreen };
