import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addChat, selectConversation } from "../../features/conversationSlice";
import { selectUser } from "../../features/userSlice";
import { addChatToDb } from "../../tools/FirestoreTools";

// css
import "./Screen2Body.css";

export default function Screen2Body() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
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
			<div className="chats">
				{partner &&
					[partner.email] in conversation.chats &&
					conversation.chats[partner.email].map((chat, idx) => {
						return (
							<div
								key={idx}
								className={
									chat.from === user.email ? "from" : "to"
								}
							>
								<p>{chat.content}</p>
								<p className="chat-time">
									<i>{chat.time}</i>
								</p>
							</div>
						);
					})}
			</div>
			<div>||||||||||||||||||||||||||||||||||||</div>

			{partner && (
				<div className="chat-input">
					<form action="" onSubmit={handleSubmit}>
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
