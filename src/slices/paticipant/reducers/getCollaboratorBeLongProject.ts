import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStatePaticipant, IPaticipant } from '../interfaces';

export const getCollaboratorBeLongProject = (state: IInitialStatePaticipant, action: PayloadAction<IPaticipant[]>) => {
	state.paticipants = action.payload;
};
