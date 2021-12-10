import { DraggableId } from 'react-beautiful-dnd';

// redux
export interface IList {
	_id: string;
	name: string;
	_projectId: string;
}

// drag and drop
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
