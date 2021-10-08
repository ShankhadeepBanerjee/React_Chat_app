import { selectConversation } from "../../features/conversationSlice";
import { useSelector } from "react-redux";
import { Avatar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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
			<div>
				{conversation.partner !== null && (
					<IconButton
						onClick={hideScreen2}
						style={{ color: "white", fontSize: "x-large" }}
					>
						<ArrowBackIcon />
					</IconButton>
				)}

				{conversation.partner !== null && (
					<>
						<Avatar src={conversation.partner.pic} />
						<p style={{ margin: "0 10px" }}>
							{conversation.partner.name}
						</p>
					</>
				)}
			</div>
			<div>
				<IconButton>
					<MoreVertIcon />
				</IconButton>
			</div>
		</div>
	);
}
