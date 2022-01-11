import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateList } from '../interfaces';

interface IPropsPayloadAction {
	_newListId: string;
	_oldListId: string;
	_taskId: string;
}

export const changeListInTaskModel = (state: IInitialStateList, action: PayloadAction<IPropsPayloadAction>) => {
	const { _newListId, _oldListId, _taskId } = action.payload;

	const newList = state.lists[_newListId];
	const oldList = state.lists[_oldListId];

	const indexTask = oldList.items.findIndex(item => item._id === _taskId);

	if (indexTask >= 0) {
		const [ task ] = oldList.items.splice(indexTask, 1);
		newList.items.push(task);

		state.lists[_newListId] = newList;
		state.lists[_oldListId] = oldList;
	}
};
