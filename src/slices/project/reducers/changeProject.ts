import { PayloadAction } from '@reduxjs/toolkit';
import { IElementProject, IInitialStateProject } from '../interfaces';

export const changeProject = (state: IInitialStateProject, action: PayloadAction<IElementProject>) => {
	const spaceId = Object.keys(action.payload)[0];
	const newProject = action.payload[spaceId][0];
	const listProject = state.projects[spaceId];

	const index = listProject.findIndex(p => p._id === newProject._id);
	listProject[index] = newProject;

	state.projects[spaceId] = listProject;
};
