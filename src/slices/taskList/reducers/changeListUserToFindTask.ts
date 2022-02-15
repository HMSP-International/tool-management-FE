import { PayloadAction } from '@reduxjs/toolkit';
import { IUserDashboard } from 'slices/dashboard/interfaces';
import { IInitialStateList } from '../interfaces';

export const changeListUserToFindTask = (state: IInitialStateList, action: PayloadAction<IUserDashboard[]>) => {
	state.users = action.payload;
};
