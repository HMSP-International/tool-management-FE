export interface IInitialStateProfile {
	status: string;
	error?: string | null;

	name: string | null;
	department: string | null;
	position: string | null;
	title: string | null;
	email: string | null;
}
