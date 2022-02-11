import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'slices/dashboard/interfaces';
import { IInitialStateUser } from '../interfaces';

export const setEmail = (state: IInitialStateUser, action: PayloadAction<IUser>) => {
	state.profile.email = action.payload.email;
};
