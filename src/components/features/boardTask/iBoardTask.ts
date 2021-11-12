import { DraggableId } from 'react-beautiful-dnd';

export interface ITask {
	_listId: DraggableId;
	content?: string;
}

export interface ILists {
	[key: string]: {
		name: string;
		items: Array<ITask>;
	};
}

export interface IDataColumn {
	name: string;
	items: Array<ITask>;
}
