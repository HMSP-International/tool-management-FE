import { IRole } from 'slices/role/interfaces';

export interface IInitialStateDashboard {
	status: string;
	error?: string | null;

	users: IUserDashboard[];
	customers: ICustomerDashboard[];
}

export interface IUserDashboard {
	_id: string;
	avatar: string;
	displayName: string;
	email: string;
	department: string;
	position: string;
	title: string;
	action: string;
	__typename?: string;
	_roleId: IRole;
}

export interface ICustomerDashboard {
	_id: string;
	avatar: string;
	displayName: string;
	email: string;
	action: string;
	__typename?: string;
}
