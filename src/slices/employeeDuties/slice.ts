import { createSlice, Slice } from '@reduxjs/toolkit';
import INITIAL_STATE from './initialState';

import reducers from './reducers';

export const employeeDutiesSlice: Slice = createSlice({
	name: 'employeeDuties',
	initialState: INITIAL_STATE,
	reducers,
});
const { reducer, actions } = employeeDutiesSlice;
export const { setProject, setSpace } = actions;
export default reducer;
