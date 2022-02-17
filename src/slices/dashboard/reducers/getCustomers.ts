import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateDashboard, ICustomerDashboard } from '../interfaces';

export const getCustomers = (state: IInitialStateDashboard, action: PayloadAction<ICustomerDashboard[]>) => {
	state.customers = action.payload;
};
