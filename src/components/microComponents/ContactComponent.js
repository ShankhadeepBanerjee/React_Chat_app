import { selectConversation } from "../../features/conversationSlice";
import { useSelector, useDispatch } from "react-redux";

// css
import "./ContactComponent.css";
import { getChatsForAPersoneAndShowOnChatsScreen } from "../../tools/AppSpecificTools";

export default function ContactComponent(props) {
	const conversation = useSelector(selectConversation);
	const { pic, name } = props.contact;
	const dispatch = useDispatch();

	function handleClick() {
		getChatsForAPersoneAndShowOnChatsScreen(
			props.contact,
			conversation,
			dispatch
		);
	}

	return (
		<div className="contact-component" onClick={handleClick}>
			<div className="contact-img">
				<img src={pic} alt="" />
			</div>

			<div>
				<p>{name}</p>
			</div>
			<div>{props.chat}</div>
		</div>
	);
}
