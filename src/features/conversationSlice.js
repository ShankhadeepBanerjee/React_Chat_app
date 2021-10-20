import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebaseConfig";

const conversationSlice = createSlice({
	name: "conversation",
	initialState: {
		partner: null,
		chats: {},
		recentChats: {},
		alreadyFetchedChats: {},
	},
	reducers: {
		setPartner: (state, action) => {
			state.partner = action.payload;
		},
		setChatsFor: (state, action) => {
			const to = action.payload.to;
			const chatsArray = action.payload.chats;
			if (!([to] in state.chats)) state.chats[to] = chatsArray;
			else state.chats[to] = [...state.chats[to], ...chatsArray];
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
			state.recentChats = {
				...state.recentChats,
				[chatToAdd]: message,
			};
		},

		setRecentChats: (state, action) => {
			const recentChatsFromDb = action.payload;
			state.recentChats = recentChatsFromDb;
		},

		addToAlreadyFetched: (state, action) => {
			state.alreadyFetchedChats[action.payload] = true;
		},
		resetConversation: (state) => {
			state.partner = null;
			state.chats = {};
			state.recentChats = {};
			state.alreadyFetchedChats = {};
		},
	},
});

export const {
	setPartner,
	addChat,
	setChatsFor,
	setRecentChats,
	addToAlreadyFetched,
	resetConversation,
} = conversationSlice.actions;
export const selectConversation = (state) => state.conversation;
export default conversationSlice.reducer;
