import { useSelector, useDispatch } from "react-redux";
import { toggleShowScreen1_1 } from "../../features/layoutSlice";
import { selectContacts } from "../../features/contactsSlice";
import { AddContact } from "./AddContact";
import ContactComponent from "./ContactComponent";

export default function ContactsList() {
	const contacts = useSelector(selectContacts);
	const dispatch = useDispatch();

	return (
		<div>
			<button
				onClick={() => {
					dispatch(toggleShowScreen1_1());
				}}
			>
				Done
			</button>
			<p>This is Contacts List</p>
			<AddContact />

			<div>
				{contacts.contactList.map((contact, idx) => {
					return <ContactComponent propObj={contact} key={idx} />;
				})}
			</div>
		</div>
	);
}
