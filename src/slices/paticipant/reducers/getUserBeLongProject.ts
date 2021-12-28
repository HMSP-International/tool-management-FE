import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'slices/dashboard/interfaces';
import { IInitialStatePaticipant } from '../interfaces';

export const getUserBeLongProject = (state: IInitialStatePaticipant, action: PayloadAction<IUser[]>) => {
	state.userBeLongProject = action.payload;
};
