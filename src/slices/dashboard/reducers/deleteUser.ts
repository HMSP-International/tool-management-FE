import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateDashboard, IUser } from '../interfaces';

export const deleteUser = (state: IInitialStateDashboard, action: PayloadAction<IUser>) => {
	state.users = state.users.filter(user => user._id !== action.payload._id);
};
