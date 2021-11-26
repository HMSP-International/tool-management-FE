export interface IInitialStateAuth {
	status: string;
	error?: string | null;

	jwt: string | null;
}

export interface ILogin {
	jwt: string | null;
}
