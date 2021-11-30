import { PayloadAction } from '@reduxjs/toolkit';
import { IElementProject, IInitialStateProject } from '../interfaces';

export const createProject = (
	state: IInitialStateProject,
	action: PayloadAction<IElementProject>,
) => {
	const keys = Object.keys(action.payload);

	state.projects[keys[0]] = action.payload[keys[0]];
};
