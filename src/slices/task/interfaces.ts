import { DraggableId } from 'react-beautiful-dnd';
import { IComment } from 'slices/comment/interfaces';
import { IUserDashboard } from 'slices/dashboard/interfaces';
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
	reporter: IUserDashboard;
	timestamp: {
		createAt: Date;
		updateAt: Date;
	};
	_projectId: IProject;
	assignee: IUserDashboard | null;
	descriptions: string;
	comments: IComment[];
	stt: number;
	estimatedTime: IEstimatedTime[];
}

export interface IEstimatedTime {
	_listId: string;
	totalTime: number;
	lastTime: string | null;
}
