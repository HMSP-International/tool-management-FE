import { createSlice, Slice } from '@reduxjs/toolkit';
import INITIAL_STATE from './initialState';

import reducers from './reducers';

export const authSlice: Slice = createSlice({
	name: 'auth',
	initialState: INITIAL_STATE,
	reducers,
});
const { reducer, actions } = authSlice;
export const { login, logout } = actions;
export default reducer;
