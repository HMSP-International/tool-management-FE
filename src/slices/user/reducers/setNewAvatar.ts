import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'slices/dashboard/interfaces';
import { IInitialStateUser } from '../interfaces';

export const setNewAvatar = (state: IInitialStateUser, action: PayloadAction<IUser>) => {
	state.profile.avatar = action.payload.avatar;
};
