import { useState } from "react";
import { db } from "../../firebaseConfig";
import "./Home.css";
import launchImg from "./launch.svg";

import {
	signInWithGoogle,
	firebaseSignOut,
} from "../../tools/FirebaseAuthentication";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";

export default function Home() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	function handleChange(e) {
		setPhoneNumber(e.target.value);
	}

	return (
		<div className="home">
			<div className="home__left">
				<img src={launchImg} alt="" />
			</div>
			<div className="home__right">
				<div className="logIn__container">
					<h1>Welcome</h1>
					<div className="log_in_btn" onClick={signInWithGoogle}>Log In</div>
				</div>
			</div>
		</div>
	);
}


{/* <button onClick={signInWithGoogle}>Sign In</button>
			<button onClick={firebaseSignOut}>SignOut</button>
			<button
				onClick={() => {
					console.log(user.name);
				}}
			>
				Get User
			</button> */}