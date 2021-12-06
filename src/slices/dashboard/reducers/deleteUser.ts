import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateDashboard, IUser } from '../interfaces';

export const deleteUser = (state: IInitialStateDashboard, action: PayloadAction<IUser[]>) => {
	state.users = action.payload;
};