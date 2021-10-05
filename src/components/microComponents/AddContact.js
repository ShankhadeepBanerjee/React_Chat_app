import { useState } from "react";
import { useDispatch } from "react-redux";

// states
import { addContact } from "../../features/contactsSlice";
import { addContactToDb } from "../../tools/FirestoreTools";

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
		let contactAdded = await addContactToDb(contact);
		if (contactAdded) dispatch(addContact(contactAdded));
		setNewContact({ name: "", email: "", pic: "" });
	}

	return (
		<div>
			<div>
				{contactFormOpen == false ? (
					<button onClick={() => setContactFormOpen(true)}>
						Add New Contact
					</button>
				) : (
					<form
						action=""
						onSubmit={(e) => {
							e.preventDefault();
							addNewContact(newContact);
							setContactFormOpen(false);
						}}
					>
						<div>
							<label htmlFor="name">name</label>
							<input
								type="text"
								name="name"
								value={newContact.name}
								onChange={handleContactFormChange}
							/>
						</div>
						<div>
							<label htmlFor="email">email</label>
							<input
								type="email"
								name="email"
								value={newContact.email}
								onChange={handleContactFormChange}
							/>
						</div>

						<button>ADD</button>
					</form>
				)}
			</div>
		</div>
	);
}
