import "./Screen2.css";
import Nav2 from "../macroComponents/Nav2";
import Screen2Body from "../macroComponents/Screen2Body";

import { selectConversation } from "../../features/conversationSlice";
import { useSelector } from "react-redux";

export default function Screen2() {
	const conversation = useSelector(selectConversation);

	return (
		<div className="screen2">
			{conversation.partner && (
				<>
					<Nav2 />
					<Screen2Body />
				</>
			)}
		</div>
	);
}
