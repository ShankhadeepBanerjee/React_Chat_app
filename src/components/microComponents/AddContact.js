// React essentials
import { useState } from "react";
import { useDispatch } from "react-redux";

// tools
import { addContact } from "../../features/contactsSlice";
import { addContactToDb } from "../../tools/FirestoreTools";

// MaterialUi
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Button } from "@mui/material";

// css
import "./AddContact.css";
import { IconButton } from "@mui/material";

export function AddContact() {
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
					<label htmlFor="name">Name: </label>
					<input
						type="text"
						name="name"
						value={newContact.name}
						onChange={handleContactFormChange}
					/>
					<label htmlFor="email">Email: </label>
					<input
						type="email"
						name="email"
						value={newContact.email}
						onChange={handleContactFormChange}
					/>

					<div>
						<Button
							variant="contained"
							color="primary"
							size="small"
							onClick={handleSubmit}
						>
							Add
						</Button>
						<Button
							variant="outlined"
							color="error"
							size="small"
							onClick={formClose}
						>
							Cancel
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}
