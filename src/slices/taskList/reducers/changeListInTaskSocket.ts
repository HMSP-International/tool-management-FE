import { PayloadAction } from '@reduxjs/toolkit';
import { IInitialStateList } from '../interfaces';

interface IDraggableLocation {
	index: number;
	_listId: string;
}

interface IPropsPayloadAction {
	destination: IDraggableLocation;
	source: IDraggableLocation;
	_taskId: string;
}

function insertAt (array: any[], index: number, ...elementsArray: any) {
	array.splice(index, 0, ...elementsArray);
}

export const changeListInTaskSocket = (state: IInitialStateList, action: PayloadAction<IPropsPayloadAction>) => {
	const { destination, source, _taskId } = action.payload;

	const newList = state.lists[destination._listId];
	const oldList = state.lists[source._listId];

	const indexTask = oldList.items.findIndex(item => item._id === _taskId);

	if (indexTask >= 0) {
		const [ taskRemoved ] = oldList.items.splice(indexTask, 1);

		if (destination._listId === source._listId) {
			const min = Math.min(destination.index, source.index);
			const max = Math.max(destination.index, source.index);
			insertAt(newList.items, destination.index, taskRemoved);
			for (let i = min; i <= max; i++) {
				newList.items[i].order = i;
			}
		}
	}
};
