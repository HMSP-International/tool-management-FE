import { PayloadAction } from '@reduxjs/toolkit';
import { ISpace, IInitialStateSpace } from '../interfaces';

export const changeNameSpace = (state: IInitialStateSpace, action: PayloadAction<ISpace>) => {
	const index = state.spaces.findIndex(space => space._id === action.payload._id);

	state.spaces[index] = action.payload;
};
