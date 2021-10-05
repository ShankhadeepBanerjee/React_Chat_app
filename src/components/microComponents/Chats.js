import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectConversation } from "../../features/conversationSlice";
import { selectUser } from "../../features/userSlice";

// css
import "./Chats.css";

export default function Chats() {
	const user = useSelector(selectUser);
	const conversation = useSelector(selectConversation);
	const partner = conversation.partner;

	const InvisibleDiv = () => {
		const divRef = useRef(null);
		useEffect(() => {
			partner &&
				[partner.email] in conversation.chats &&
				divRef.current.scrollIntoView({ behavior: "smooth" });
		}, [partner, conversation.chats]);
		return <div id="hidden-chat" ref={divRef}></div>;
	};

	const Messages = (props) => {
		console.log(props.messages);
		return (
			<>
				{props.messages.map((chat, idx) => {
					return (
						<div
							key={idx}
							className={chat.from === user.email ? "from" : "to"}
						>
							<p>{chat.content}</p>
							<p className="chat-time">
								<i>{chat.time}</i>
							</p>
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
