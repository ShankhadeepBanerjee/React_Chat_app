import {
	selectConversation,
	setPartner,
} from "../../features/conversationSlice";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

// css
import "./Nav2.css";

export default function Nav2() {
	const conversation = useSelector(selectConversation);
	const dispatch = useDispatch();

	function hideScreen2() {
		const elem = document.querySelector(".screen2");
		elem.style["z-index"] = "0";
	}

	return (
		<div className="sc2-nav">
			<div>
				{conversation.partner !== null && (
					<IconButton
						onClick={() => {
							hideScreen2();
							dispatch(setPartner(null));
						}}
						className="icon"
						id="back-btn"
					>
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
				<IconButton className="icon" disabled>
					<SearchOutlinedIcon />
				</IconButton>
				<IconButton className="icon" disabled>
					<MoreVertIcon />
				</IconButton>
			</div>
		</div>
	);
}
