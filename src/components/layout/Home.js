import "./Home.css";
import launchImg from "./launch.svg";

import {
	signInWithGoogle,
	firebaseSignOut,
} from "../../tools/FirebaseAuthentication";

import GoogleIcon from "@mui/icons-material/Google";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

const LogedInUserProfile = ({ user, lockSetter }) => {
	return (
		<div className="logged-in-user">
			<div>
				<div className="user-image-div">
					<img src={user.photoURL} alt="" />
				</div>
				<div className="user-description-div">
					<span>{user.name}</span>
					<span style={{ fontSize: "small", color: "grey" }}>
						<em>{user.email}</em>
					</span>
				</div>
			</div>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<div className="btn" onClick={() => lockSetter(true)}>
					Enter
				</div>
				<div className="btn" onClick={firebaseSignOut}>
					Log Out
				</div>
			</div>
		</div>
	);
};

export default function Home({ lockSetter }) {
	const user = useSelector(selectUser);

	return (
		<div className="home">
			<div className="home-background-blob-object"></div>
			<div className="home__left">
				<img src={launchImg} alt="" />
			</div>
			<div className="home__right">
				<div className="logIn__container">
					<h1
						style={{
							textAlign: "center",
							margin: "10px 0",
						}}
					>
						Welcome
					</h1>
					{user.signedIn ? (
						<LogedInUserProfile
							user={user}
							lockSetter={lockSetter}
						/>
					) : (
						<div className="log_in_btn" onClick={signInWithGoogle}>
							<GoogleIcon />
							<span style={{ margin: "0 10px" }}>
								Sign In With Google
							</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
