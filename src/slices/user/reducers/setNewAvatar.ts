import { PayloadAction } from '@reduxjs/toolkit';
import { IUserDashboard } from 'slices/dashboard/interfaces';
import { IInitialStateUser } from '../interfaces';

export const setNewAvatar = (state: IInitialStateUser, action: PayloadAction<IUserDashboard>) => {
	state.profile.avatar = action.payload.avatar;
};
