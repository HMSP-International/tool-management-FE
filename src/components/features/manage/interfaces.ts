import { DraggableId } from 'react-beautiful-dnd';

export interface ITask {
	_id: DraggableId;
	name: string;
}

export interface ITaskList {
	[key: string]: {
		name: string;
		items: Array<ITask>;
	};
}

export interface IDataColumn {
	name: string;
	items: Array<ITask>;
}
