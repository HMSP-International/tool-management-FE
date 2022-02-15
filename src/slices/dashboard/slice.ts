import { createSlice, Slice } from '@reduxjs/toolkit';
import INITIAL_STATE from './initialState';

import reducers from './reducers';

export const userSlice: Slice = createSlice({
	name: 'dashboard',
	initialState: INITIAL_STATE,
	reducers,
});
const { reducer, actions } = userSlice;
export const {
	createCustomer,
	createUser,
	deleteCustomer,
	deleteUser,
	getUsers,
	getCustomers,
	updateInformationCustomer,
	updateInformationUser,
} = actions;
export default reducer;
