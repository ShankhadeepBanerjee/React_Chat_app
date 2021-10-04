import "./Screen1_1.css";
import SetUpProfile from "../microComponents/SetUpProfile";
import { useSelector } from "react-redux";
import { selectLayout } from "../../features/layoutSlice";
import ContactsList from "../microComponents/ContactsList";

export default function Screen1_1() {
	const layout = useSelector(selectLayout);
	return (
		<div
			className="screen1_1"
			style={{
				width: `${layout.showScreen1_1 ? "100%" : "0%"}`,
			}}
		>
			{layout.contactsList && <ContactsList />}
			{layout.setUpProfile && <SetUpProfile />}
		</div>
	);
}
