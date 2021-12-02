export interface IInitialStateAuth {
	status: string;
	error?: string | null;

	jwt: string | '';
}

export interface ILogin {
	jwt: string | '';
}
