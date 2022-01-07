import { IUser } from 'slices/dashboard/interfaces';
import { ITask } from 'slices/task/interfaces';

export interface IInitialStateComment {
	status: string;
	error?: string | null;

	comments: IComment[];
}

export interface IComment {
	_id: string;
	_userId: IUser;
	content: string;
	_taskId: ITask;
}
