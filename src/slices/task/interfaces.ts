import { DraggableId } from 'react-beautiful-dnd';
import { IComment } from 'slices/comment/interfaces';
import { IUser } from 'slices/dashboard/interfaces';
import { IProject } from 'slices/project/interfaces';

export interface IInitialStateTask {
	currentTask: ITask[];
}

// drag and drop
export interface ITask {
	_id: DraggableId;
	name: string;
	_listId: string;
	order: number;
	reporter: IUser;
	timestamp: {
		createAt: Date;
		updateAt: Date;
	};
	_projectId: IProject;
	assignee: IUser | null;
	descriptions: string;
	comments: IComment[];
}
