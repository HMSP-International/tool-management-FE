import { PayloadAction } from '@reduxjs/toolkit';
import { ITaskOfList, IInitialStateList } from '../interfaces';

export const getTasksInList = (state: IInitialStateList, action: PayloadAction<ITaskOfList>) => {
	const { key, items } = action.payload;
	state.lists[key] = { ...state.lists[key], items };
};
