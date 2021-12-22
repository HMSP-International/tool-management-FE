export interface IInitialStateRole {
	status: string;
	error?: string | null;

	role: IRole;
}

export interface IRole {
	_id: string;
	name: string;
}
