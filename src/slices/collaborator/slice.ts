import { createSlice, Slice } from '@reduxjs/toolkit';
import INITIAL_STATE from './initialState';

import reducers from './reducers';

export const spaceSlice: Slice = createSlice({
	name: 'collaborator',
	initialState: INITIAL_STATE,
	reducers,
});
const { reducer, actions } = spaceSlice;
export const { getCollaborators } = actions;
export default reducer;
