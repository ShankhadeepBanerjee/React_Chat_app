import {
	selectConversation,
	setChatsFor,
	setPartner,
} from "../../features/conversationSlice";

import { selectUser } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";

// css
import "./ContactComponent.css";
import { getChats } from "../../tools/FirestoreTools";
export default function ContactComponent(props) {
	const conversation = useSelector(selectConversation);
	const user = useSelector(selectUser);
	const { pic, name, email } = props.propObj;
	const dispatch = useDispatch();
	function handleClick() {
		dispatch(setPartner(props.propObj));
		if (email in conversation.chats) return;
		(async () => {
			const chatsArray = await getChats(user.email, email);
			dispatch(setChatsFor({ to: email, chats: chatsArray }));
		})();
	}
	return (
		<div className="contact-component" onClick={handleClick}>
			<div className="contact-img">
				<img src={pic} alt="" />
			</div>

			<div>
				<p>{name}</p>
			</div>
		</div>
	);
}
