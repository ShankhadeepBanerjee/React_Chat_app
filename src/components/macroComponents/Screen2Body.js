import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addChat, selectConversation } from "../../features/conversationSlice";
import { selectUser } from "../../features/userSlice";
import { auth } from "../../firebaseConfig";
import { addChatToDb } from "../../tools/FirestoreTools";
import Chats from "../microComponents/Chats";

// css
import "./Screen2Body.css";

export default function Screen2Body() {
	// const user = useSelector(selectUser);
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
		const chatObj = {
			content: chatInput,
			time: new Date().toLocaleTimeString(),
			from: user.email,
			to: partner.email,
		};
		addChatToDb(user.email, partner.email, chatObj);
		dispatch(addChat(chatObj));
		setChatInput("");
	}

	return (
		<div className="convrsation">
			{partner && <Chats />}

			{partner && (
				<div className="chat-input">
					<form
						action=""
						onSubmit={handleSubmit}
						className="chat-input-box"
					>
						<input
							type="text"
							name="chatInput"
							value={chatInput}
							onChange={handleChange}
							placeholder="Type here"
						/>
						<button>ADD</button>
					</form>
				</div>
			)}
		</div>
	);
}
