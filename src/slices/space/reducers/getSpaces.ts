import { PayloadAction } from '@reduxjs/toolkit';
import { ISpace, IInitialStateSpace } from '../interfaces';
import STATUS from '../../../global/constants/status';

export const getSpaces = (state: IInitialStateSpace, action: PayloadAction<ISpace[]>) => {
	state.spaces = action.payload;
	state.status = STATUS.SUCCESS;
};
