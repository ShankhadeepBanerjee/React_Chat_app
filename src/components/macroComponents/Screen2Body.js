import { useSelector } from "react-redux";
import { selectConversation } from "../../features/conversationSlice";
import Chats from "../microComponents/Chats";
import ChatInput from "../microComponents/ChatInput";

// css
import "./Screen2Body.css";

export default function Screen2Body() {
	const conversation = useSelector(selectConversation);
	const partner = conversation.partner;

	return (
		<div className="convrsation">
			{partner && (
				<>
					<Chats />
					<ChatInput />
				</>
			)}
		</div>
	);
}
