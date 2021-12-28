import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateProject, IProject } from '../interfaces';

export const currentProject = (state: IInitialStateProject, action: PayloadAction<IProject>) => {
	state.currentProject = action.payload;
};
