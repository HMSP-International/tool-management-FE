import { ICollaborator } from 'slices/collaborator/interfaces';
import { IUserDashboard } from 'slices/dashboard/interfaces';
import { IProject } from 'slices/project/interfaces';

export interface IInitialStatePaticipant {
	status: string;
	error?: string | null;

	userBeLongProject: IUserDashboard[];
	paticipants: IPaticipant[];
	currentPaticipant: IPaticipant | null;
}

export interface IPaticipant {
	_id: string;
	_collaboratorId: ICollaborator;
	_projectId: IProject;
	role: string;
	_memberId: IUserDashboard;
}
