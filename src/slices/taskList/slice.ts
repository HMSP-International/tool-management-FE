import { createSlice, Slice } from '@reduxjs/toolkit';

import reducers from './reducers';

export const taskListSlice: Slice = createSlice({
	name: 'taskList',
	initialState: {},
	reducers,
});
const { reducer } = taskListSlice;
// export const {} = actions;
export default reducer;
