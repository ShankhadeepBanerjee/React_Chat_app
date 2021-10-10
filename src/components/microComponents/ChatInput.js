import React from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachmentIcon from "@mui/icons-material/Attachment";
import SendIcon from "@mui/icons-material/Send";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import { IconButton } from "@mui/material";

// css
import "./ChatInput.css";

export default function ChatInput(props) {
	return (
		<div className="chat-input">
			<form action="" onSubmit={props.handleSubmit}>
				<Box className="chat-input-box">
					<IconButton className="emoji">
						<InsertEmoticonIcon />
					</IconButton>

					<IconButton className="attachment">
						<AttachmentIcon />
					</IconButton>

					<input
						value={props.chatInput}
						onChange={props.handleChange}
						placeholder="Type a  message"
						className="chat-input-field"
					/>

					<IconButton style={{ color: "var(--icon-color)" }}>
						<MicOutlinedIcon />
					</IconButton>
				</Box>
			</form>
		</div>
	);
}
