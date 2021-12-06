import { ISpace } from '../space/interfaces';

export interface IInitialStateCollaborator {
	status: string;
	error?: string | null;

	collaborators: ICollaborator[];
}

export interface ICollaborator {
	_id: number;
	_memberId: string;
	_adminId: string;
	_workSpaceId: ISpace;
	confirmEmail: boolean;
}
