import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectConversation } from "../../features/conversationSlice";
import { selectUser } from "../../features/userSlice";

import parse from "html-react-parser";

// Material UI
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";

// css
import "./Chats.css";

export default function Chats() {
	const user = useSelector(selectUser);
	const conversation = useSelector(selectConversation);
	const partner = conversation.partner;
	// const messagesToShow = conversation.chats[partner.email];

	return (
		<div className="chats">
			{partner && [partner.email] in conversation.chats && (
				<Messages
					messages={conversation.chats[partner.email]}
					user={user}
					partner={partner}
				/>
			)}
		</div>
	);
}

const Messages = ({ messages, user, partner }) => {
	return (
		<>
			{messages.map((chat, idx) => {
				return (
					<div
						key={idx}
						className={
							"message-element " +
							(chat.from === user.email ? "from" : "to")
						}
					>
						<span className="message-element-tail"></span>
						<div className="main-body">
							{parse(
								chat.content.mediaContent +
									chat.content.chatContent
							)}
							<p className="message-time">
								<i>{chat.time}</i>
							</p>
						</div>
					</div>
				);
			})}
			<InvisibleDiv key={messages.length} partner={partner} />
		</>
	);
};

const InvisibleDiv = () => {
	const conversation = useSelector(selectConversation);
	const partner = conversation.partner;
	const divRef = useRef(null);
	useEffect(() => {
		partner &&
			[partner.email] in conversation.chats &&
			divRef.current.scrollIntoView({ behavior: "smooth" });
	}, [partner, conversation.chats]);
	return <div id="hidden-chat" ref={divRef}></div>;
};
