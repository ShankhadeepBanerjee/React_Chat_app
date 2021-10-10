import "./Screen1_1.css";
import SetUpProfile from "../microComponents/SetUpProfile";
import { useDispatch, useSelector } from "react-redux";
import { selectLayout } from "../../features/layoutSlice";
import ContactsList from "../microComponents/ContactsList";
import { toggleShowScreen1_1 } from "../../features/layoutSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

export default function Screen1_1() {
	const dispatch = useDispatch();
	const layout = useSelector(selectLayout);
	return (
		<div
			className="screen1_1"
			style={{
				transform: `translateX(${
					layout.showScreen1_1 ? "0%" : "-100%"
				})`,
			}}
		>
			<div className="header">
				<div>
					<div>
						<IconButton
							onClick={() => {
								dispatch(toggleShowScreen1_1());
							}}
							style={{ color: "white", fontSize: "x-large" }}
						>
							<ArrowBackIcon />
						</IconButton>
					</div>
					<div>
						{layout.contactsList && "New Chats"}
						{layout.setUpProfile && "Profile"}
					</div>
				</div>
			</div>
			<div className="body">
				{layout.contactsList && <ContactsList />}
				{layout.setUpProfile && <SetUpProfile />}
			</div>
		</div>
	);
}
