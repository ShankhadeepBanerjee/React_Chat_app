import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addChat, selectConversation } from "../../features/conversationSlice";
import { auth } from "../../firebaseConfig";
import { addChatToSenderAndReceiverDb } from "../../tools/FirestoreTools";
import Chats from "../microComponents/Chats";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import AttachmentIcon from "@mui/icons-material/Attachment";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
// css
import "./Screen2Body.css";

export default function Screen2Body() {
	// const user = useSelector(selectUser);
	const dispatch = useDispatch();
	const user = auth.currentUser;
	const conversation = useSelector(selectConversation);
	const partner = conversation.partner;

	const [chatInput, setChatInput] = useState("");

	function handleChange(e) {
		setChatInput(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		let dt = new Date();
		const chatObj = {
			content: chatInput,
			time: dt.toLocaleTimeString(),
			timeStamp: dt.getTime(),
			from: user.email,
			to: partner.email,
		};
		addChatToSenderAndReceiverDb(user.email, partner.email, chatObj);
		dispatch(addChat(chatObj));
		setChatInput("");
	}

	return (
		<div className="convrsation">
			{partner && <Chats />}

			{partner && (
				<div className="chat-input">
					<form action="" onSubmit={handleSubmit}>
						<Box className="chat-input-box">
							<IconButton className="emoji">
								<EmojiEmotionsIcon />
							</IconButton>
							<IconButton className="attachment">
								<AttachmentIcon />
							</IconButton>
							<TextField
								value={chatInput}
								onChange={handleChange}
								placeholder="Type here"
								style={{
									width: "80%",
									borderRadius: "20px",
									background: "white",
								}}
							/>
							<IconButton style={{ color: "white" }}>
								<SendIcon />
							</IconButton>
						</Box>
					</form>
				</div>
			)}
		</div>
	);
}
