import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import layoutReducer from "../features/layoutSlice";
import contactsReducer from "../features/contactsSlice";
import conversationReducer from "../features/conversationSlice";

export default configureStore({
	reducer: {
		user: userReducer,
		layout: layoutReducer,
		contacts: contactsReducer,
		conversation: conversationReducer,
	},
});
