import { PayloadAction } from '@reduxjs/toolkit';
import { ITask, IInitialStateList } from '../interfaces';

export const createTaskInList = (state: IInitialStateList, action: PayloadAction<ITask>) => {
	const { _listId } = action.payload;

	state.lists[_listId].items = [ ...state.lists[_listId].items, action.payload ];
};
