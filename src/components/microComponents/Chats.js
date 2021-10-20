import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectConversation } from "../../features/conversationSlice";
import { selectUser } from "../../features/userSlice";

import parse from "html-react-parser";

// css
import "./Chats.css";

export default function Chats() {
	const user = useSelector(selectUser);
	const conversation = useSelector(selectConversation);
	const partner = conversation.partner;
	// const messagesToShow = conversation.chats[partner.email];

	const InvisibleDiv = () => {
		const divRef = useRef(null);
		useEffect(() => {
			partner &&
				[partner.email] in conversation.chats &&
				divRef.current.scrollIntoView({ behavior: "smooth" });
		}, [partner, conversation.chats]);
		return <div id="hidden-chat" ref={divRef}></div>;
	};

	console.log("Rendering Chats ");
	const Messages = (props) => {
		console.log("Rendering messages ");

		return (
			<>
				{props.messages.map((chat, idx) => {
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
				<InvisibleDiv key={props.messages.length} />
			</>
		);
	};

	return (
		<div className="chats">
			{partner && [partner.email] in conversation.chats && (
				<Messages messages={conversation.chats[partner.email]} />
			)}
		</div>
	);
}
