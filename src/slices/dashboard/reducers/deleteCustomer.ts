import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateDashboard, ICustomerDashboard } from '../interfaces';

export const deleteCustomer = (state: IInitialStateDashboard, action: PayloadAction<ICustomerDashboard>) => {
	state.customers = state.customers.filter(customer => customer._id !== action.payload._id);
};
