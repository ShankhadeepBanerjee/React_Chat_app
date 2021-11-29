import React from "react";
import "./RecentChats.css";
import { selectConversation } from "../../features/conversationSlice";
import { useSelector } from "react-redux";
import ChatHead from "./ChatHead";

export default function RecentChats() {
	const conversation = useSelector(selectConversation);
	// const recentChats = Object.values(conversation.recentChats);
	return (
		<div>
			{conversation.recentChats &&
				Object.values(conversation.recentChats)
					.sort((a, b) => b.timeStamp - a.timeStamp)
					.map((chat) => {
						return <ChatHead key={chat.timeStamp} message={chat} />;
					})}
		</div>
	);
}
