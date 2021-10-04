import { useState } from "react";
import { db } from "../../firebaseConfig";
import "./Home.css";

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
			<button onClick={signInWithGoogle}>Sign In</button>
			<button onClick={firebaseSignOut}>SignOut</button>
			<button
				onClick={() => {
					console.log(user.name);
				}}
			>
				Get User
			</button>
		</div>
	);
}
