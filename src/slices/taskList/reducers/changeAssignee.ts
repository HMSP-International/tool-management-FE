import { PayloadAction } from '@reduxjs/toolkit';
import { ITask } from 'slices/task/interfaces';
import { IInitialStateList } from '../interfaces';

export const changeTask = (state: IInitialStateList, action: PayloadAction<ITask>) => {
	const { _listId, order } = action.payload;

	state.lists[_listId].items[order] = action.payload;
};
