import "./Nav1.css";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { firebaseSignOut } from "../../tools/FirebaseAuthentication";
import { togglePropertyState } from "../../features/layoutSlice";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Badge from "@mui/material/Badge";

import { useState } from "react";

export default function Nav1() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();
	useState;

	return (
		<div className="sc1-nav">
			<div
				className="nav-user"
				onClick={() => {
					dispatch(togglePropertyState("setUpProfile"));
				}}
				style={{ height: "inherit", cursor: "pointer" }}
			>
				<Avatar src={user.photoURL} />
			</div>

			<div className="nav-options">
				<IconButton className="nav-options">
					<Tooltip title="status">
						<Badge color="secondary" badgeContent=" " variant="dot">
							<NotificationsNoneIcon />
						</Badge>
					</Tooltip>
				</IconButton>
				<IconButton>
					<Tooltip title="new chat">
						<ChatIcon
							onClick={() => {
								dispatch(togglePropertyState("contactsList"));
							}}
						/>
					</Tooltip>
				</IconButton>
				<IconButton>
					<Tooltip title="log out">
						<LogoutIcon onClick={firebaseSignOut} />
					</Tooltip>
				</IconButton>
			</div>
		</div>
	);
}
