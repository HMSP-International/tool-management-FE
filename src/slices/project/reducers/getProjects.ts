import { PayloadAction } from '@reduxjs/toolkit';
import { IElementProject, IInitialStateProject } from '../interfaces';

export const getProjects = (
	state: IInitialStateProject,
	action: PayloadAction<IElementProject>,
) => {
	state.projects = action.payload;
};
