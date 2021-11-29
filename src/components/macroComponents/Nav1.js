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
				<IconButton className="nav-options" disabled>
					<Tooltip title="status">
						<Badge color="secondary" badgeContent=" " variant="dot">
							{/* <NotificationsNoneIcon /> */}
							<span
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<svg
									id="ee51d023-7db6-4950-baf7-c34874b80976"
									viewBox="0 0 24 24"
									width="24"
									height="24"
								>
									<path
										fill="currentColor"
										d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
									></path>
								</svg>
							</span>
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
