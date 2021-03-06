import { PayloadAction } from '@reduxjs/toolkit';
import { IElementProject, IInitialStateProject } from '../interfaces';

export const createProject = (state: IInitialStateProject, action: PayloadAction<IElementProject>) => {
	const spaceId = Object.keys(action.payload)[0];
	const newProject = action.payload[spaceId][0];
	const listProject = state.projects[spaceId] || [];

	listProject.push(newProject);

	state.projects[spaceId] = listProject;
};
