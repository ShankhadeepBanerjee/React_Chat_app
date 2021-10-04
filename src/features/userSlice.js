import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		name: null,
		pic: null,
		signedIn: false,
		email: null,
	},
	reducers: {
		signInUser: (state, action) => {
			state.name = action.payload.displayName;
			state.pic = action.payload.photoURL;
			state.email = action.payload.email;
			state.signedIn = true;
		},
		signOutUser: (state) => {
			state.name = null;
			state.pic = null;
			state.email = null;
			state.signedIn = false;
		},
		changeProfilePic: (state, action) => {
			state.pic = action.payload;
		},
	},
});

export const { signInUser, signOutUser, changeProfilePic } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
