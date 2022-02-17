import { PayloadAction } from '@reduxjs/toolkit';
import { IUserDashboard } from 'slices/dashboard/interfaces';
import { IInitialStatePaticipant } from '../interfaces';

export const getUserBeLongProject = (state: IInitialStatePaticipant, action: PayloadAction<IUserDashboard[]>) => {
	state.userBeLongProject = action.payload;
};
