import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateDashboard, IUser } from '../interfaces';

export const updateInformationUser = (
	state: IInitialStateDashboard,
	action: PayloadAction<IUser>,
) => {
	const index: number = state.users.findIndex(user => user._id === action.payload._id);

	state.users[index] = action.payload;
};
