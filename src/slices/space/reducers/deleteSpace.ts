import { PayloadAction } from '@reduxjs/toolkit';
import { ISpace, IInitialStateSpace } from '../interfaces';

export const deleteSpace = (state: IInitialStateSpace, action: PayloadAction<ISpace>) => {
	state.spaces = state.spaces.filter(space => space._id !== action.payload._id);
};
