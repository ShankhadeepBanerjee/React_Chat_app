import ProfilePic from "../microComponents/ProfilePic";
import { selectConversation } from "../../features/conversationSlice";
import { useSelector } from "react-redux";

// css
import "./Nav2.css";

export default function Nav2() {
	const conversation = useSelector(selectConversation);
	console.log(conversation.partner);
	return (
		<div className="sc2-nav">
			<button>Back</button>
			{conversation.partner !== null && (
				<>
					<ProfilePic pic={conversation.partner.pic} />
					<p>{conversation.partner.name}</p>
				</>
			)}
		</div>
	);
}
