import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebaseConfig";
import { getContactsForUser } from "../tools/FirestoreTools";

const contactsSlice = createSlice({
	name: "contacts",
	initialState: {
		contactList: {},
	},
	reducers: {
		addContact: (state, action) => {
			const contact = action.payload;
			if (auth.currentUser.email === contact.email) {
				alert("Cant add own contact");
				return;
			}
			console.log("adding contact", contact.email in state.contactList);
			if (state.contactList[contact.email])
				alert("Contact already exists");
			else state.contactList[contact.email] = contact;
		},
		populateContacts: (state, action) => {
			state.contactList = action.payload;
		},
		resetContact: (state) => {
			state.contactList = [];
		},
	},
});

export const {
	addContact,
	populateContacts,
	resetContact,
} = contactsSlice.actions;
export const selectContacts = (state) => state.contacts;
export default contactsSlice.reducer;
