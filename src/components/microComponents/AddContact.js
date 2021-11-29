// React essentials
import { useState } from "react";
import { useDispatch } from "react-redux";

// tools
import { addContact } from "../../features/contactsSlice";
import { addContactToDb } from "../../tools/FirestoreTools";

// MaterialUi
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Button, Tooltip } from "@mui/material";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

// css
import "./AddContact.css";
import { IconButton } from "@mui/material";

const useStyles = makeStyles({
	field: {
		margin: "5px 0",
	},
});

export function AddContact() {
	const classes = useStyles();

	const dispatch = useDispatch();
	const [contactFormOpen, setContactFormOpen] = useState(false);
	const [newContact, setNewContact] = useState({
		name: "",
		email: "",
		pic: "",
	});

	function handleContactFormChange(e) {
		const { name, value } = e.target;
		console.log(name, value);
		setNewContact((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	}

	async function addNewContact(contact) {
		for (let item in contact) {
			if (item != "pic" && !contact[item]) {
				console.log(newContact);
				return;
			}
		}
		let contactAdded = await addContactToDb(contact);
		dispatch(addContact(contactAdded));
		setNewContact({ name: "", email: "", pic: "" });
	}

	function formClose() {
		console.log("Yes");
		setContactFormOpen(false);
		setNewContact({ name: "", email: "", pic: "" });
	}

	function handleSubmit() {
		addNewContact(newContact);
		setContactFormOpen(false);
	}

	return (
		<div className="add-contact">
			{contactFormOpen == false ? (
				<div
					className="add-contact-button"
					onClick={() => setContactFormOpen(true)}
				>
					<IconButton color="primary">
						<AccountCircleRoundedIcon fontSize="large" />
					</IconButton>
					<p>New Contact</p>
				</div>
			) : (
				<form
					action=""
					onSubmit={(e) => e.preventDefault()}
					className="add-contact-form"
				>
					<TextField
						type="text"
						label="Name"
						className={classes.field}
						name="name"
						value={newContact.name}
						onChange={handleContactFormChange}
					/>

					<TextField
						type="email"
						label="email"
						name="email"
						className={classes.field}
						value={newContact.email}
						onChange={handleContactFormChange}
					/>

					<div>
						<Tooltip title="Cancel">
							<IconButton color="error" onClick={formClose}>
								<CancelRoundedIcon fontSize="large" />
							</IconButton>
						</Tooltip>
						<Tooltip title="Add">
							<IconButton color="success" onClick={handleSubmit}>
								<AddCircleRoundedIcon fontSize="large" />
							</IconButton>
						</Tooltip>
					</div>
				</form>
			)}
		</div>
	);
}
