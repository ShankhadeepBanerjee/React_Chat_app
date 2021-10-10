import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addChat, selectConversation } from "../../features/conversationSlice";
import { auth } from "../../firebaseConfig";
import { addChatToSenderAndReceiverDb } from "../../tools/FirestoreTools";
import Chats from "../microComponents/Chats";
import ChatInput from "../microComponents/ChatInput";

// css
import "./Screen2Body.css";

export default function Screen2Body() {
	const dispatch = useDispatch();
	const user = auth.currentUser;
	const conversation = useSelector(selectConversation);
	const partner = conversation.partner;

	const [chatInput, setChatInput] = useState("");

	function handleChange(e) {
		setChatInput(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		let dt = new Date();
		const chatObj = {
			content: chatInput,
			time: dt.toLocaleTimeString(),
			timeStamp: dt.getTime(),
			from: user.email,
			to: partner.email,
		};
		addChatToSenderAndReceiverDb(user.email, partner.email, chatObj);
		dispatch(addChat(chatObj));
		setChatInput("");
	}

	return (
		<div className="convrsation">
			{partner && (
				<>
					<Chats />
					<ChatInput
						chatInput={chatInput}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					/>
				</>
			)}
		</div>
	);
}
