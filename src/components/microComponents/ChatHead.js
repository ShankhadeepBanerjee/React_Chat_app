import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "../../features/contactsSlice";
import { selectConversation } from "../../features/conversationSlice";
import { getChatsForAPersoneAndShowOnChatsScreen } from "../../tools/AppSpecificTools";

// Material UI
import { Avatar } from "@mui/material";

// css
import "./ChatHead.css";
import { auth } from "../../firebaseConfig";

export default function ChatHead(props) {
	const conversation = useSelector(selectConversation);
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);
	const message = props.message;

	// if message is send by the user then it would be "message.to" else "message.from"
	const contactOfTheChat =
		auth.currentUser && message.to == auth.currentUser.email
			? contacts.contactList[message.from]
			: contacts.contactList[message.to];

	function handleClick() {
		getChatsForAPersoneAndShowOnChatsScreen(
			contactOfTheChat,
			conversation,
			dispatch
		);
	}

	return (
		<div className="chat-head" onClick={handleClick}>
			{contactOfTheChat && (
				<>
					<div>
						<Avatar src={contactOfTheChat.pic} />
					</div>

					<div>
						<p>{contactOfTheChat.name}</p>
						<p>
							<b>{message.content}</b>
						</p>
					</div>
				</>
			)}
		</div>
	);
}
