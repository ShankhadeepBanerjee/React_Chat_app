import { createSlice } from "@reduxjs/toolkit";
import { getContactsForUser } from "../tools/FirestoreTools";

const contactsSlice = createSlice({
	name: "contacts",
	initialState: {
		contactList: [],
	},
	reducers: {
		addContact: (state, action) => {
			state.contactList.push(action.payload);
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
