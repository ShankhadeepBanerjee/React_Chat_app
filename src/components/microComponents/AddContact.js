import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// firestore tools
import { db } from "../../firebaseConfig";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

// states
import { selectUser } from "../../features/userSlice";
import { addContact } from "../../features/contactsSlice";
import { createChatDoc, userExists } from "../../tools/FirestoreTools";

export function AddContact() {
	const user = useSelector(selectUser);
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

	async function addContactToDb(contact) {
		if (!contact.name || !contact.email) return;
		const existUser = await userExists(contact.email);

		let bufferContact;
		if (existUser) {
			bufferContact = { ...contact, pic: existUser.photoURL };
			await updateDoc(doc(db, `Users/`, user.email), {
				contacts: arrayUnion(bufferContact),
			});
			dispatch(addContact(bufferContact));
		} else {
			alert("This user doesn't exist!!!");
			return;
		}
		setNewContact({ name: "", email: "", pic: "" });
		await createChatDoc(user.email, contact.email);
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
							addContactToDb(newContact);
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
