import { useSelector, useDispatch } from "react-redux";
import { selectContacts } from "../../features/contactsSlice";
import { AddContact } from "./AddContact";
import ContactComponent from "./ContactComponent";

export default function ContactsList() {
	const contacts = useSelector(selectContacts);

	return (
		<div>
			<AddContact />
			<div>
				{Object.keys(contacts.contactList).map((contact, idx) => {
					return (
						<ContactComponent
							contact={contacts.contactList[contact]}
							key={idx}
						/>
					);
				})}
			</div>
		</div>
	);
}
