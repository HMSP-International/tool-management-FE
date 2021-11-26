import { createSlice, Slice } from '@reduxjs/toolkit';
import INITIAL_STATE from './initialState';

import reducers from './reducers';

export const userSlice: Slice = createSlice({
	name: 'user',
	initialState: INITIAL_STATE,
	reducers,
});
const { reducer, actions } = userSlice;
export const { getProfile } = actions;
export default reducer;
