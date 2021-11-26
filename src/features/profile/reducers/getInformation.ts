import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateProfile } from '../interfaces';

export const login = (state: IInitialStateProfile, action: PayloadAction<IInitialStateProfile>) => {
	const { name, title, department, email, position } = action.payload;

	state.name = name;
	state.title = title;
	state.department = department;
	state.email = email;
	state.position = position;
};
