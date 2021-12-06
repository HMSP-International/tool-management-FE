export interface IInitialStateUser {
	status: string;
	error?: string | null;

	profile: IInitialStateProfile;
}

export interface IInitialStateProfile {
	displayName: string;
	department: string;
	position: string;
	title: string;
	email: string;
	_id: string;
}
