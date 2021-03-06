import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectContacts } from "../../features/contactsSlice";
import { selectConversation } from "../../features/conversationSlice";
import { getChatsForAPersoneAndShowOnChatsScreen } from "../../tools/AppSpecificTools";

// Material UI
import { Avatar } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";

// css
import "./ChatHead.css";
import { auth } from "../../firebaseConfig";
import { setUnreadMessageCountToZeroInDB } from "../../tools/FirestoreTools";

export default function ChatHead(props) {
	const conversation = useSelector(selectConversation);
	const dispatch = useDispatch();
	const contacts = useSelector(selectContacts);
	const message = props.message;

	const chatPreview = ({ mediaContentType, chatContent }) => {
		let mediaTypeIcon;
		switch (mediaContentType) {
			case "image":
				mediaTypeIcon = <ImageIcon />;
				break;

			case "video":
				mediaTypeIcon = <VideocamIcon />;
				break;
			default:
				mediaTypeIcon = "";
				break;
		}
		return (
			<div style={{ display: "flex", alignItems: "center" }}>
				{mediaTypeIcon}
				{chatContent ? chatContent : mediaContentType}
			</div>
		);
	};

	// if message is send by the user then it would be "message.to" else "message.from"
	const sender =
		auth.currentUser && message.to == auth.currentUser.email
			? message.from
			: message.to;

	let contactOfTheChat;

	// This checks whether the sender is in users contacts or is it a n unknown person
	if (sender in contacts.contactList)
		contactOfTheChat = contacts.contactList[sender];
	else contactOfTheChat = { email: sender, name: sender, pic: "" };

	function handleClick() {
		if (
			conversation.unreadMessages[contactOfTheChat.email] &&
			conversation.unreadMessages[contactOfTheChat.email] !== 0
		) {
			setUnreadMessageCountToZeroInDB(contactOfTheChat);
		}
		getChatsForAPersoneAndShowOnChatsScreen(
			contactOfTheChat,
			conversation,
			dispatch
		);
	}

	return (
		<div
			className={
				"chat-head " +
				(contactOfTheChat &&
				conversation.partner &&
				conversation.partner.email === contactOfTheChat.email
					? "active-chat"
					: "")
			}
			onClick={handleClick}
		>
			{contactOfTheChat && (
				<>
					<div>
						<Avatar src={contactOfTheChat.pic} />
					</div>

					<div>
						<p>{contactOfTheChat.name}</p>
						<div className="chat-prev">
							{chatPreview(message.content)}
							<UnreadMessages
								contactOfTheChat={contactOfTheChat}
							/>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

const UnreadMessages = ({ contactOfTheChat }) => {
	const conversation = useSelector(selectConversation);
	return (
		<span className="unread-messages">
			{conversation.unreadMessages[contactOfTheChat.email] &&
				conversation.unreadMessages[contactOfTheChat.email] > 0 && (
					<p>{conversation.unreadMessages[contactOfTheChat.email]}</p>
				)}
		</span>
	);
};
