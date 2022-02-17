import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateEmployeeDuties, IPropsDefaultValue } from '../interfaces';

export const setSpace = (state: IInitialStateEmployeeDuties, action: PayloadAction<IPropsDefaultValue>) => {
	state.space = action.payload;
};
