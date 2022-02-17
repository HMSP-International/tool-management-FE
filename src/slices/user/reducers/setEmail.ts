import { PayloadAction } from '@reduxjs/toolkit';
import { IUserDashboard } from 'slices/dashboard/interfaces';
import { IInitialStateUser } from '../interfaces';

export const setEmail = (state: IInitialStateUser, action: PayloadAction<IUserDashboard>) => {
	state.profile.email = action.payload.email;
};
