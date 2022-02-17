import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateDashboard, ICustomerDashboard } from '../interfaces';

export const createCustomer = (state: IInitialStateDashboard, action: PayloadAction<ICustomerDashboard>) => {
	state.customers.push(action.payload);
};
