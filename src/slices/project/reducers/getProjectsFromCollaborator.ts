import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateProject, IElementProject } from '../interfaces';

export const getProjectsFromCollaborator = (
	state: IInitialStateProject,
	action: PayloadAction<IElementProject>,
) => {
	state.projectsFromCollaborator = action.payload;
};
