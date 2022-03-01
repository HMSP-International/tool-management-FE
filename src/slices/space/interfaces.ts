export interface IInitialStateSpace {
	status: string;
	error?: string | null;

	spaces: ISpace[];
}

export interface ISpace {
	name: string;
	order: number;
	owner: string;
	_id: string;
	viewers: string[];
}
