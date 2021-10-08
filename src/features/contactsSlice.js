import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebaseConfig";
import { enableMapSet } from "immer";
enableMapSet();
const contactsSlice = createSlice({
	name: "contacts",
	initialState: {
		contactList: new Object(),
	},
	reducers: {
		addContact: (state, action) => {
			const contact = action.payload;
			if (auth.currentUser.email === contact.email) {
				alert("Cant add own contact");
				return;
			}
			if (!!state.contactList[contact.email]) {
				alert("Already user exists!!!");
				return;
			}
			state.contactList[contact.email] = contact;
		},
		populateContacts: (state, action) => {
			state.contactList = { ...action.payload };
		},
		resetContact: (state) => {
			console.log("Reseting");
			state.contactList = new Object();
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
