import { createSlice, Slice } from '@reduxjs/toolkit';
import INITIAL_STATE from './initialState';

import reducers from './reducers';

export const taskListSlice: Slice = createSlice({
	name: 'taskList',
	initialState: INITIAL_STATE,
	reducers,
});
const { reducer, actions } = taskListSlice;
export const { allTaskList } = actions;
export default reducer;
