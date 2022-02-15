import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateDashboard, IUserDashboard } from '../interfaces';

export const deleteUser = (state: IInitialStateDashboard, action: PayloadAction<IUserDashboard>) => {
	state.users = state.users.filter(user => user._id !== action.payload._id);
};
