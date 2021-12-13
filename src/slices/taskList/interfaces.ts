import { DraggableId } from 'react-beautiful-dnd';

// redux
export interface IList {
	_id: string;
	name: string;
	_projectId: string;
}

export interface ITaskOfList {
	key: string;
	items: Array<ITask>;
}

export interface IInitialStateList {
	status: string;
	error?: string | null;

	lists: ITaskList;
}

// drag and drop
export interface ITask {
	_id: DraggableId;
	name: string;
	_listId: string;
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
