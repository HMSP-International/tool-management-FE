import { PayloadAction } from '@reduxjs/toolkit';
import { ITask } from 'slices/task/interfaces';
import { IInitialStateList } from '../interfaces';

interface IPropsPayloadAction {
	_oldListId: string;
	task: ITask;
}

export const changeListInTaskModel = (state: IInitialStateList, action: PayloadAction<IPropsPayloadAction>) => {
	const { _oldListId, task } = action.payload;

	const newList = state.lists[task._listId];
	const oldList = state.lists[_oldListId];

	const indexTask = oldList.items.findIndex(item => item._id === task._id);

	if (indexTask >= 0) {
		const [ taskRemoved ] = oldList.items.splice(indexTask, 1);
		newList.items.push({ ...taskRemoved, ...task });

		state.lists[task._listId] = newList;
		state.lists[_oldListId] = oldList;
	}
};
