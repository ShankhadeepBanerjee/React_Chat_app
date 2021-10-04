import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
	name: "layout",
	initialState: {
		setUpProfile: false,
		contactsList: false,
		showScreen1_1: false,
	},
	reducers: {
		toggleShowScreen1_1: (state) => {
			state.showScreen1_1 = !state.showScreen1_1;
		},
		togglePropertyState: (state, action) => {
			for (let property in state) {
				if (property == action.payload) state[property] = true;
				else state[property] = false;
			}
			state.showScreen1_1 = true;
		},
	},
});

export const { toggleShowScreen1_1, togglePropertyState } = layoutSlice.actions;
export const selectLayout = (state) => state.layout;
export default layoutSlice.reducer;
