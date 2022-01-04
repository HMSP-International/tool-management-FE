import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStatePaticipant, IPaticipant } from '../interfaces';

export const currentPaticipant = (state: IInitialStatePaticipant, action: PayloadAction<IPaticipant>) => {
	state.currentPaticipant = action.payload;
};
