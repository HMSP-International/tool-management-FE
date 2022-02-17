import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateDashboard, ICustomerDashboard } from '../interfaces';

export const updateInformationCustomer = (state: IInitialStateDashboard, action: PayloadAction<ICustomerDashboard>) => {
	const index: number = state.customers.findIndex(user => user._id === action.payload._id);

	if (index >= 0) {
		state.customers[index] = action.payload;
	}
};
