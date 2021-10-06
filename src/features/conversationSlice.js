import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebaseConfig";

const conversationSlice = createSlice({
	name: "conversation",
	initialState: {
		partner: null,
		chats: {},
	},
	reducers: {
		setPartner: (state, action) => {
			state.partner = action.payload;
		},
		setChatsFor: (state, action) => {
			const to = action.payload.to;
			const chatsArray = action.payload.chats;
			state.chats[to] = chatsArray;
		},
		addChat: (state, action) => {
			let message = action.payload;
			let chatToAdd =
				message["from"] === auth.currentUser.email
					? message["to"]
					: message["from"];
			{
				state.chats[chatToAdd]
					? (state.chats[chatToAdd] = [
							...state.chats[chatToAdd],
							message,
					  ])
					: (state.chats[chatToAdd] = [message]);
			}
		},
		resetConversation: (state) => {
			state.partner = null;
			state.chats = {};
		},
	},
});

export const {
	setPartner,
	addChat,
	setChatsFor,
	resetConversation,
} = conversationSlice.actions;
export const selectConversation = (state) => state.conversation;
export default conversationSlice.reducer;
