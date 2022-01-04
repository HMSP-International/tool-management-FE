import { PayloadAction } from '@reduxjs/toolkit';
import { IProject, IInitialStateProject } from '../interfaces';

export const deleteProject = (state: IInitialStateProject, action: PayloadAction<IProject>) => {
	const { _spaceId, _id } = action.payload;

	state.projects[_spaceId] = state.projects[_spaceId].filter(p => p._id !== _id);
};
