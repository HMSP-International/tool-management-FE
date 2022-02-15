import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateDashboard, IUserDashboard } from '../interfaces';

export const getUsers = (state: IInitialStateDashboard, action: PayloadAction<IUserDashboard[]>) => {
	state.users = action.payload;
};
