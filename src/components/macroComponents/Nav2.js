import ProfilePic from "../microComponents/ProfilePic";
import { selectConversation } from "../../features/conversationSlice";
import { useSelector } from "react-redux";

// css
import "./Nav2.css";

export default function Nav2() {
	const conversation = useSelector(selectConversation);
	return (
		<div className="sc2-nav">
			{conversation.partner !== null && (
				<ProfilePic pic={conversation.partner.pic} />
			)}
		</div>
	);
}
