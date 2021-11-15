import { PayloadAction } from '@reduxjs/toolkit';
import { ITaskLists, IInitialState } from '../interfaces';

export const getTaskLists = (state: IInitialState, action: PayloadAction<Array<ITaskLists>>) => {
	state.taskLists = action.payload;
};
