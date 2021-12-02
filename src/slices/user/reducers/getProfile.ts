import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateUser, IInitialStateProfile } from '../interfaces';

export const getProfile = (state: IInitialStateUser, action: PayloadAction<IInitialStateProfile>) => {
	const { displayName, title, department, email, position } = action.payload;

	state.profile.displayName = displayName;
	state.profile.title = title;
	state.profile.department = department;
	state.profile.email = email;
	state.profile.position = position;
};
