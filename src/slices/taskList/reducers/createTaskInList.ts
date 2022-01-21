import { PayloadAction } from '@reduxjs/toolkit';
import { ITask } from 'slices/task/interfaces';
import { IInitialStateList } from '../interfaces';

export const createTaskInList = (state: IInitialStateList, action: PayloadAction<ITask>) => {
	const { _listId } = action.payload;
	const index = state.lists[_listId].items.findIndex(task => task._id === action.payload._id);

	if (index >= 0) {
		state.lists[_listId].items[index] = action.payload;
	}
	else {
		state.lists[_listId].items = [ ...state.lists[_listId].items, action.payload ];
	}
};
