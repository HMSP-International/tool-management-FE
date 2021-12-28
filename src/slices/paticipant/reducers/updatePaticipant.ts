import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStatePaticipant, IPaticipant } from '../interfaces';

export const updatePaticipant = (state: IInitialStatePaticipant, action: PayloadAction<IPaticipant>) => {
	const index = state.paticipants.findIndex(p => p._id === action.payload._id);
	state.paticipants[index] = action.payload;
};
