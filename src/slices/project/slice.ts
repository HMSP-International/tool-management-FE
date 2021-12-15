import { createSlice, Slice } from '@reduxjs/toolkit';
import INITIAL_STATE from './initialState';

import reducers from './reducers';

export const spaceSlice: Slice = createSlice({
	name: 'project',
	initialState: INITIAL_STATE,
	reducers,
});
const { reducer, actions } = spaceSlice;
export const { getProjects, deleteProject, createProject, getProjectsFromCollaborator } = actions;
export default reducer;
