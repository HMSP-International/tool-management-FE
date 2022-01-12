import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'slices/dashboard/interfaces';
import { IInitialStateList } from '../interfaces';

export const changeListUserToFindTask = (state: IInitialStateList, action: PayloadAction<IUser[]>) => {
	state.users = action.payload;
};
