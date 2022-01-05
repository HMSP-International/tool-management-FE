import { DraggableId } from 'react-beautiful-dnd';
import { IUser } from 'slices/dashboard/interfaces';
import { IProject } from 'slices/project/interfaces';

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
	descriptions: string[];
}
