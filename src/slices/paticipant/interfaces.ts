import { ICollaborator } from 'slices/collaborator/interfaces';
import { IUser } from 'slices/dashboard/interfaces';
import { IProject } from 'slices/project/interfaces';

export interface IInitialStatePaticipant {
	status: string;
	error?: string | null;

	userBeLongProject: IUser[];
	paticipants: IPaticipant[];
}

export interface IPaticipant {
	_id: string;
	_collaboratorId: ICollaborator;
	_projectId: IProject;
	role: string;
}
