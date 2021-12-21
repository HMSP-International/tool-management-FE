import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateUser, IInitialStateProfile } from '../interfaces';

export const getProfile = (state: IInitialStateUser, action: PayloadAction<IInitialStateProfile>) => {
	state.profile = action.payload;
};
