import "./Home.css";
import launchImg from "./launch.svg";

import {
	signInWithGoogle,
	firebaseSignOut,
} from "../../tools/FirebaseAuthentication";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

export default function Home({ lockSetter }) {
	const user = useSelector(selectUser);

	return (
		<div className="home">
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
						<div className="already-logged-in">
							<h3
								style={{
									textAlign: "center",
									margin: "10px 0",
								}}
							>
								Username: {user.name}
							</h3>
							<h3
								style={{
									textAlign: "center",
									margin: "10px 0",
								}}
							>
								Email: {user.email}
							</h3>
							<div
								style={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<div
									className="btn"
									onClick={() => lockSetter(true)}
								>
									Enter
								</div>
								<div className="btn" onClick={firebaseSignOut}>
									{" "}
									Log Out
								</div>
							</div>
						</div>
					) : (
						<div className="log_in_btn" onClick={signInWithGoogle}>
							Log In
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
