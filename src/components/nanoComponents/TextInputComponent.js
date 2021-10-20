import React from "react";

// css
import "./TextInputComponent.css";

export default function TextInputComponent(props) {
	return (
		<input
			value={props.chatInput}
			onChange={props.handleChange}
			placeholder="Type a  message"
			className={props.classes}
		/>
	);
}
