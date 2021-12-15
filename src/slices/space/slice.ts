import { createSlice, Slice } from '@reduxjs/toolkit';
import INITIAL_STATE from './initialState';

import reducers from './reducers';

export const spaceSlice: Slice = createSlice({
	name: 'space',
	initialState: INITIAL_STATE,
	reducers,
});
const { reducer, actions } = spaceSlice;
export const { changeNameSpace, deleteSpace, getSpaces } = actions;
export default reducer;
