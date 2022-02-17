import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateEmployeeDuties, IPropsDefaultValue } from '../interfaces';

export const setProject = (state: IInitialStateEmployeeDuties, action: PayloadAction<IPropsDefaultValue>) => {
	state.project = action.payload;
};
