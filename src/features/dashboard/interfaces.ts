export interface IInitialStateDashboard {
	status: string;
	error?: string | null;

	users: IUser[];
}

export interface IUser {
	_id: string;
	avt: string;
	displayName: string;
	email: string;
	department: string;
	position: string;
	title: string;
	action: string;
}
