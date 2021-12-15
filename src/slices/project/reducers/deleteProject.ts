import { PayloadAction } from '@reduxjs/toolkit';
import { IProject, IInitialStateProject } from '../interfaces';

export const deleteProject = (state: IInitialStateProject, action: PayloadAction<IProject>) => {
	const projectId = action.payload._id;

	delete state.projects[projectId];
};
