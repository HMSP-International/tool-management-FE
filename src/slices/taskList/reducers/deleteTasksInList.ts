import { PayloadAction } from '@reduxjs/toolkit';
import { ITask, IInitialStateList } from '../interfaces';

export const deleteTasksInList = (state: IInitialStateList, action: PayloadAction<ITask[]>) => {
	action.payload.forEach(({ _listId, _id }) => {
		state.lists[_listId].items = state.lists[_listId].items.filter(item => item._id !== _id);
	});
};
