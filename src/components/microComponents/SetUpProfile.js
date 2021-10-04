// hooks, functions and states
import { selectUser } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { selectLayout, toggleShowScreen1_1 } from "../../features/layoutSlice";

// css
import "./SetUpProfile.css";

export default function SetUpProfile() {
	const user = useSelector(selectUser);
	const layout = useSelector(selectLayout);
	const dispatch = useDispatch();
	return (
		<div className="setup-profile">
			<button
				onClick={() => {
					dispatch(toggleShowScreen1_1());
				}}
			>
				Done
			</button>
			<div>
				<div>
					<img src={user.pic} alt="" />
				</div>
				<div>Name: {user.name}</div>
				<div>Email: {user.email}</div>
			</div>
		</div>
	);
}
