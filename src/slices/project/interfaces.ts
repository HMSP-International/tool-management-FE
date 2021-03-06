export interface IInitialStateProject {
	status: string;
	error?: string | null;

	projects: IElementProject;

	projectsFromCollaborator: IElementProject;

	currentProject: IProject;
}

export interface IElementProject {
	[key: string]: IProject[];
}

export interface IProject {
	name: string;
	order: number;
	owner: string;
	_id: string;
	_spaceId: string;
}
