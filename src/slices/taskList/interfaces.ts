export interface ITaskLists {
	_id?: string;
	name?: string;
	_workSpaceId?: string;
}

export interface IInitialState {
	status: string;
	error?: string | null;
	taskLists: Array<ITaskLists> | null;
}
