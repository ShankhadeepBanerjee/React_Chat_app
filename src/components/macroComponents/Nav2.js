import ProfilePic from "../microComponents/ProfilePic";
import { selectConversation } from "../../features/conversationSlice";
import { useSelector } from "react-redux";

// css
import "./Nav2.css";

export default function Nav2() {
	const conversation = useSelector(selectConversation);

	function hideScreen2() {
		const elem = document.querySelector(".screen2");
		elem.style["z-index"] = "0";
	}

	return (
		<div className="sc2-nav">
			<button onClick={hideScreen2}>Back</button>
			{conversation.partner !== null && (
				<>
					<ProfilePic pic={conversation.partner.pic} />
					<p>{conversation.partner.name}</p>
				</>
			)}
		</div>
	);
}
