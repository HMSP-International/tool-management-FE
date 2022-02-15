import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateDashboard, IUserDashboard } from '../interfaces';

export const createUser = (state: IInitialStateDashboard, action: PayloadAction<IUserDashboard>) => {
	state.users.push(action.payload);
};
