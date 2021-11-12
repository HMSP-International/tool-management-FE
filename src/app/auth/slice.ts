import { createSlice, Slice } from '@reduxjs/toolkit';
import INITIAL_STATE from './initialState';

// import extraReducers from './extraReducers';
import reducers from './reducers';

export const authSlice: Slice = createSlice({
	name: 'auth',
	initialState: INITIAL_STATE,
	reducers : {
		
	},
	extraReducers: {},
});

// export const {} = authSlice.actions;
export default authSlice.reducer;
