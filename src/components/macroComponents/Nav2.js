import { selectConversation } from "../../features/conversationSlice";
import { useSelector } from "react-redux";
import { Avatar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

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
					<IconButton onClick={hideScreen2} className="icon back-btn">
						<ArrowBackIcon />
					</IconButton>
				)}

				{conversation.partner !== null && (
					<>
						<Avatar src={conversation.partner.pic} />
						<p
							style={{
								margin: "0 10px",
								width: "150px",
								whiteSpace: "nowrap",
								overflow: "hidden",
								textOverflow: "ellipsis",
							}}
						>
							{conversation.partner.name}
						</p>
					</>
				)}
			</div>
			<div className="nav2-options">
				<IconButton className="icon">
					<SearchOutlinedIcon />
				</IconButton>
				<IconButton className="icon">
					<MoreVertIcon />
				</IconButton>
			</div>
		</div>
	);
}
