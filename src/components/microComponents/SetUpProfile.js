// hooks, functions and states
import { selectUser } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";

// css
import "./SetUpProfile.css";

export default function SetUpProfile() {
	const user = useSelector(selectUser);
	return (
		<div className="setup-profile">
			<div className="profile-pic">
				<img src={user.pic} alt="" />
			</div>
			<div className="profile-div">
				<h4>Your Name</h4>
				<p>{user.name}</p>
			</div>
			<div className="profile-div">
				<h4>Your Email</h4>
				<p>{user.email}</p>
			</div>
		</div>
	);
}
