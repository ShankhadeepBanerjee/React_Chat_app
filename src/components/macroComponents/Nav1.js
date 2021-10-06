import "./Nav1.css";
import ProfilePic from "../microComponents/ProfilePic";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { firebaseSignOut } from "../../tools/FirebaseAuthentication";
import { togglePropertyState } from "../../features/layoutSlice";

export default function Nav1() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	return (
		<div className="sc1-nav">
			<div
				onClick={() => {
					dispatch(togglePropertyState("setUpProfile"));
				}}
				style={{ height: "inherit", cursor: "pointer" }}
			>
				<ProfilePic pic={user.pic} />
			</div>
			<p>{user.name}</p>
			<button
				onClick={() => {
					dispatch(togglePropertyState("contactsList"));
				}}
			>
				My Contacts
			</button>
			<button onClick={firebaseSignOut}>Sign Out</button>
		</div>
	);
}
