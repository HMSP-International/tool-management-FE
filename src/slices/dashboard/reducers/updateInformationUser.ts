import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateDashboard, IUserDashboard } from '../interfaces';

export const updateInformationUser = (state: IInitialStateDashboard, action: PayloadAction<IUserDashboard>) => {
	const index: number = state.users.findIndex(user => user._id === action.payload._id);

	if (index >= 0) {
		state.users[index] = action.payload;
	}
};
