import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateDashboard, IUser } from '../interfaces';

export const createUser = (state: IInitialStateDashboard, action: PayloadAction<IUser>) => {
	state.users.push(action.payload);
};
