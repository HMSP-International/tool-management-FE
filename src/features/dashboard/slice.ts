import { createSlice, Slice } from '@reduxjs/toolkit';
import INITIAL_STATE from './initialState';

import reducers from './reducers';

export const userSlice: Slice = createSlice({
	name: 'dashboard',
	initialState: INITIAL_STATE,
	reducers,
});
const { reducer, actions } = userSlice;
export const { createUser, getUsers, deleteUser } = actions;
export default reducer;
