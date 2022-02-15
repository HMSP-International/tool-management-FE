import { IUserDashboard } from 'slices/dashboard/interfaces';
import { ISpace } from '../space/interfaces';

export interface IInitialStateCollaborator {
	status: string;
	error?: string | null;

	collaborators: ICollaborator[];
}

export interface ICollaborator {
	_id: string;
	_memberId: IUserDashboard;
	_adminId: string;
	_workSpaceId: ISpace;
	confirmEmail: boolean;
	role: string;
}
