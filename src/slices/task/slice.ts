import { createSlice, Slice } from '@reduxjs/toolkit';
import INITIAL_STATE from './initialState';
import reducers from './reducers';

export const taskListSlice: Slice = createSlice({
	name: 'task',
	initialState: INITIAL_STATE,
	reducers,
});

const { reducer, actions } = taskListSlice;

export const {} = actions;

export default reducer;
