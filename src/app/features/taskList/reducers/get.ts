import { PayloadAction } from '@reduxjs/toolkit';
import { ITaskLists, IInitialState } from '../interfaces';

export const allTaskList = (state: IInitialState, action: PayloadAction<Array<ITaskLists>>) => {
	state.taskLists = action.payload;
};
