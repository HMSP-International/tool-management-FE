import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateProject, IProject } from '../interfaces';

export const removeViewerFromProject = (state: IInitialStateProject, action: PayloadAction<IProject>) => {
	state.currentProject.viewers = action.payload.viewers;
};
