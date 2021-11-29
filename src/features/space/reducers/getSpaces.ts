import { PayloadAction } from '@reduxjs/toolkit';
import { ISpace, IInitialStateSpace } from '../interfaces';

export const getSpaces = (state: IInitialStateSpace, action: PayloadAction<ISpace[]>) => {
	state.spaces = action.payload;
};
