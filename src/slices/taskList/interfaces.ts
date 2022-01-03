import { ITask } from "slices/task/interfaces";

// redux
export interface IList {
	_id: string;
	name: string;
	_projectId: string;
	order: number;
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
