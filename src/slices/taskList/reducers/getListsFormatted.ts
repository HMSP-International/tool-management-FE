import { PayloadAction } from '@reduxjs/toolkit';
import { ITaskList, IInitialStateList } from '../interfaces';

export const getListsFormatted = (state: IInitialStateList, action: PayloadAction<ITaskList>) => {
	state.lists = action.payload;
};
